// import styled from "styled-components";
// import Button, { ButtonStyle } from "@/components/Button";
// import CartIcon from "@/components/icons/CartIcon";
// import Link from "next/link";
// import { useContext, useEffect, useState } from "react";
// import { CartContext } from "@/components/CartContext";
// import { primary } from "@/lib/colors";
// import FlyingButton from "@/components/FlyingButton";
// import HeartOutlineIcon from "@/components/icons/HeartOutlineIcon";
// import HeartSolidIcon from "@/components/icons/HeartSolidIcon";
// import axios from "axios";
// import { useSession } from "next-auth/react";
// import ButtonLink from "./ButtonLink";

// const ProductWrapper = styled.div`
//   button {
//     width: 100%;
//     text-align: center;
//     justify-content: center;
//   }
// `;

// const WhiteBox = styled(Link)`
//   background-color: #fff;
//   padding: 20px;
//   height: 120px;
//   text-align: center;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 10px;
//   position: relative;
//   transition: transform 0.3s ease; /* Add transition for smooth scaling */
//   img {
//     max-width: 100%;
//     max-height: 130px;
//   }

//   &:hover {
//     transform: scale(1.15); /* Scales up the box to 105% of its size */
//   }
// `;

// const Title = styled(Link)`
//   font-weight: normal;
//   font-size: 0.9rem;
//   color: inherit;
//   text-decoration: none;
//   margin: 0;
// `;

// const ProductInfoBox = styled.div`
//   margin-top: 5px;
// `;

// const PriceRow = styled.div`
//   display: block;
//   @media screen and (min-width: 768px) {
//     display: flex;
//     gap: 5px;
//   }
//   align-items: center;
//   justify-content: space-between;
//   margin-top: 2px;
// `;

// const Price = styled.div`
//   font-size: 1rem;
//   font-weight: 400;
//   text-align: right;
//   @media screen and (min-width: 768px) {
//     font-size: 1.2rem;
//     font-weight: 600;
//     text-align: left;
//   }
// `;

// const WishlistButton = styled.button`
//   border: 0;
//   width: 40px !important;
//   height: 40px;
//   padding: 10px;
//   position: absolute;
//   top: 0;
//   right: 0;
//   background: transparent;
//   cursor: pointer;
//   ${(props) =>
//     props.wished
//       ? `
//     color:red;
//   `
//       : `
//     color:black;
//   `}
//   svg {
//     width: 16px;
//   }
// `;

// export default function ProductBox({
//   _id,
//   title,
//   description,
//   price,
//   images,
//   wished = false,
//   onRemoveFromWishlist = () => {},
// }) {
//   const { data: session } = useSession();
//   const url = "/product/" + _id;
//   const [isWished, setIsWished] = useState(wished);
//   function addToWishlist(ev) {
//     ev.preventDefault();
//     ev.stopPropagation();
//     const nextValue = !isWished;
//     if (nextValue === false && onRemoveFromWishlist) {
//       onRemoveFromWishlist(_id);
//     }
//     axios
//       .post("/api/wishlist", {
//         product: _id,
//       })
//       .then(() => {});
//     setIsWished(nextValue);
//   }
//   return (
//     <ProductWrapper>
//       <WhiteBox href={url}>
//         <div>
//           {session && (
//             <WishlistButton wished={isWished} onClick={addToWishlist}>
//               {isWished ? <HeartSolidIcon /> : <HeartOutlineIcon />}
//             </WishlistButton>
//           )}
//           <img src={images?.[0]} alt="" />
//         </div>
//       </WhiteBox>
//       <ProductInfoBox>
//         <Title href={url}>{title}</Title>
//         <PriceRow>
//           <Price>Rs {price}</Price>
//           {/* <FlyingButton _id={_id} src={images?.[0]}>
//             Add to cart
//           </FlyingButton> */}
//           <ButtonLink href={"/product/" + _id} outline={1} white={1}>
//             Show More
//           </ButtonLink>
//         </PriceRow>
//       </ProductInfoBox>
//     </ProductWrapper>
//   );
// }
import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import HeartOutlineIcon from "@/components/icons/HeartOutlineIcon";
import HeartSolidIcon from "@/components/icons/HeartSolidIcon";
import ButtonLink from "./ButtonLink";

const ButtonLinkStyled = styled(ButtonLink)`
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;
const ProductWrapper = styled.div`
  &:hover ${ButtonLinkStyled} {
    opacity: 1;
    visibility: visible;
  }
`;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: relative;
  transition: transform 0.3s ease; /* Add transition for smooth scaling */
  img {
    max-width: 100%;
    max-height: 140px;
  }
  &:hover {
    transform: scale(1.15); /* Scales up the box to 115% of its size */
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  color: inherit;
  text-decoration: none;
  margin: 0;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 400;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight: 600;
    text-align: left;
  }
`;

const WishlistButton = styled.button`
  border: 0;
  width: 40px;
  height: 40px;
  padding: 10px;
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  cursor: pointer;
  color: ${(props) => (props.wished ? "red" : "black")};
  svg {
    width: 16px;
  }
`;

export default function ProductBox({
  _id,
  title,
  price,
  images,
  wished = false,
  onRemoveFromWishlist = () => {},
}) {
  const { data: session } = useSession();
  const url = "/product/" + _id;
  const [isWished, setIsWished] = useState(wished);

  function addToWishlist(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    const nextValue = !isWished;
    setIsWished(nextValue);

    axios
      .post("/api/wishlist", { product: _id })
      .then(() => {
        if (!nextValue && onRemoveFromWishlist) {
          onRemoveFromWishlist(_id);
        }
      })
      .catch((error) => {
        console.error("Error updating wishlist", error);
        setIsWished(!nextValue); // Revert the wish state on error
      });
  }

  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          {session && (
            <WishlistButton wished={isWished} onClick={addToWishlist}>
              {isWished ? <HeartSolidIcon /> : <HeartOutlineIcon />}
            </WishlistButton>
          )}
          <img src={images?.[0]} alt={title} />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>රු{price}.00</Price>
          <ButtonLinkStyled href={"/product/" + _id} outline={1} white={1}>
            VIEW ITEM
          </ButtonLinkStyled>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
