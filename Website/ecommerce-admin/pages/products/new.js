import ProductForm from "@/components/ProductForm";
import Layout from "@/components/Layout";

export default function NewProduct() {
  return (
    <Layout>
      <h1 style={{ textAlign: "center", fontSize: "2rem" }}>New Product</h1>
      <ProductForm />
    </Layout>
  );
}
