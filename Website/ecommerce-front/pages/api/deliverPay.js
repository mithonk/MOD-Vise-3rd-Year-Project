import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("should be a POST request");
    return;
  }
  const { name, email, phoneNumber, address, city, district, cartProducts } =
    req.body;
  await mongooseConnect();
  const productsIds = cartProducts.map((item) => item.id);
  const uniqueIds = [...new Set(productsIds)];
  const productsInfos = await Product.find({ _id: uniqueIds });

  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(
      (p) => p._id.toString() === productId
    );
    const quantity = productsIds.filter((id) => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "LKR",
          product_data: { name: productInfo.title },
          unit_amount: quantity * productInfo.price * 100,
        },
      });
    }
  }

  const session = await getServerSession(req, res, authOptions);

  try {
    const orderDoc = await Order.create({
      line_items,
      name,
      email,
      phoneNumber,
      address,
      city,
      district,
      paid: false, // Indicates that payment will be made upon delivery
      delivered: false,
      userEmail: session?.user?.email,
    });

    res
      .status(200)
      .json({ message: "Order placed successfully", order: orderDoc });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
}
