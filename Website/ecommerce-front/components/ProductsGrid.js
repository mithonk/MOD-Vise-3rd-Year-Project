import styled from "styled-components";
import ProductBox from "@/components/ProductBox";
import { RevealWrapper } from "next-reveal";
import Link from "next/link";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const RedButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 5px;
  margin-top: 20px; // Adjust as needed
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darkred;
  }
`;

// You can use a div or any other container for the button if you want
const ButtonContainer = styled.div`
  grid-column: 1 / -1; // Span the button container across all columns
  display: flex; // Use flexbox for alignment
  justify-content: center; // Center horizontally in the flex container
  margin-top: 20px; // Adjust as needed
`;
export default function ProductsGrid({ products, wishedProducts = [] }) {
  return (
    <StyledProductsGrid interval={100}>
      {products?.length > 0 &&
        products.map((product, index) => (
          <RevealWrapper key={product._id} delay={index * 50}>
            <ProductBox
              {...product}
              wished={wishedProducts.includes(product._id)}
            />
          </RevealWrapper>
        ))}
      <ButtonContainer>
        <Link href="./categories" passHref>
          <RedButton>Shop More</RedButton>
        </Link>
      </ButtonContainer>
    </StyledProductsGrid>
  );
}
