import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";
import CartIcon from "@/components/icons/CartIcon";
import FlyingButton from "@/components/FlyingButton";
import ProductReviews from "@/components/ProductReviews";
import React, { useState } from "react";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const Price = styled.span`
  font-size: 1.4rem;
`;
const SizeButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const SizeButton = styled.button`
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
`;

const OutOfStockMessage = styled.p`
  color: red;
  font-weight: bold;
`;
export default function ProductPage({ product }) {
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };
  const availableSizes = (product.sizes || []).filter(
    (item) => item.quantity > 0
  );
  const sizesOnly = availableSizes.map((item) => item.size);

  // const handleSizeClick = (size) => {
  //   // You can add your logic here to handle the size click (e.g., add to cart).
  //   // For now, I'm just showing an alert as an example.
  //   alert(`You have select size ${size}`);
  // };
  const isOutOfStock = availableSizes.length === 0;

  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <div>
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <PriceRow>
              <div>
                <Price>Rs {product.price}.00</Price>
              </div>
              <div>
                {isOutOfStock ? (
                  <OutOfStockMessage>Sorry, Out of Stock</OutOfStockMessage>
                ) : (
                  <div>
                    <p>Available Sizes:</p>
                    <SizeButtons>
                      {sizesOnly.map((size) => (
                        <SizeButton
                          key={size}
                          onClick={() => handleSizeClick(size)}
                        >
                          {size}
                        </SizeButton>
                      ))}
                    </SizeButtons>
                    {selectedSize && <p>You have selected: {selectedSize}</p>}
                  </div>
                )}
                <br />
                <FlyingButton main _id={product._id} src={product.images?.[0]} size={selectedSize}  disabled={!selectedSize}>
                  <CartIcon />
                  Add to cart
                </FlyingButton>
              </div>
            </PriceRow>
          </div>
        </ColWrapper>
        <ProductReviews product={product} />
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
