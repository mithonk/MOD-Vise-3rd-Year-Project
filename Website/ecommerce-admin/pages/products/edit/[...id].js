import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "@/components/ProductForm";
import Spinner from "@/components/Spinner";

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
      console.log("Response", response);
      setIsLoading(false);
    });
  }, [id]);
  return (
    <Layout>
      <h1 style={{ textAlign: "center", fontSize: "2rem" }}>Edit Product</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        productInfo && <ProductForm {...productInfo} />
      )}
    </Layout>
  );
}
