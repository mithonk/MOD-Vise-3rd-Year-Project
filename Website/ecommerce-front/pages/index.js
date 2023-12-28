import Header from "@/components/Header";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";
import { WishedProduct } from "@/models/WishedProduct";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Setting } from "@/models/Setting";
import Footer from "@/components/Footer";
import Header2 from "@/components/Header2";
import Ad1 from "@/components/Advertise1";
import MenProducts from "@/components/MenProducts";
import WomenProducts from "@/components/WomenProducts";
import FlipProducts from "@/components/FlipProducts";
import { Category } from "@/models/Category";

export default function HomePage({
  mensProducts,
  newProducts,
  wishedNewProducts,
  womensProducts,
  flipProducts,
}) {
  return (
    <div>
      <Header />

      <Header2 />
      {/* <Featured product={featuredProduct} /> */}
      <NewProducts products={newProducts} wishedProducts={wishedNewProducts} />
      <MenProducts products={mensProducts} wishedProducts={wishedNewProducts} />
      <WomenProducts
        products={womensProducts}
        wishedProducts={wishedNewProducts}
      />
      <FlipProducts
        products={flipProducts}
        wishedProducts={wishedNewProducts}
      />
      <Ad1 />
      <Footer />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  await mongooseConnect();
  const featuredProductSetting = await Setting.findOne({
    name: "featuredProductId",
  });
  let featuredProduct = [];
  if (featuredProductSetting) {
    console.log({ featuredProductSetting });
    const featuredProductId = featuredProductSetting.value;
    featuredProduct = await Product.findById(featuredProductId);
  }
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 12,
  });
  const productsWithMensCategory = await Product.find()
    .populate({
      path: "category",
      model: Category, // Filter the populated category by name
      match: { name: "Mens" },
    })
    .exec();

  // Filter out products where the category is 'Mens'
  const mensProducts = productsWithMensCategory.filter(
    (product) => product.category !== null
  );
  const productsWithWomensCategory = await Product.find()
    .populate({
      path: "category",
      model: Category, // Filter the populated category by name
      match: { name: "Womens" },
    })
    .exec();
  const womensProducts = productsWithWomensCategory.filter(
    (product) => product.category !== null
  );
  // Filter out products where the category is 'Womens'

  const productsWithFlipCategory = await Product.find().populate({
    path: "category",
    model: Category,
    match: { name: "FLIP" },
  });
  const flipProducts = productsWithFlipCategory.filter(
    (product) => product.category !== null
  );
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const wishedNewProducts = session?.user
    ? await WishedProduct.find({
        userEmail: session.user.email,
        product: newProducts.map((p) => p._id.toString()),
      })
    : [];
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),

      mensProducts: JSON.parse(JSON.stringify(mensProducts)),
      womensProducts: JSON.parse(JSON.stringify(womensProducts)),
      flipProducts: JSON.parse(JSON.stringify(flipProducts)),

      wishedNewProducts: wishedNewProducts.map((i) => i.product.toString()),
    },
  };
}
