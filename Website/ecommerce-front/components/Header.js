import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import { useContext, useState } from "react";
import { CartContext } from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";
import SearchIcon from "@/components/icons/SearchIcon";
import Header2 from "./Header2";

// Styled components
const StyledHeader = styled.header`
  position: static;
  top: 0;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const TopLayer = styled.div`
  background-color: white;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  font-size: 15px;
  height: 40px;
  border-bottom: 2px solid black;
`;

const BottomLayer = styled.div`
  height: 30px;
  background-color: red;
`;

const SecondLayer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 15px 20px;
`;

const Logo = styled.a`
  color: #000;
  font-weight: bold;
  text-decoration: none;
`;
const Banner1 = styled.div`
  height: 100px;
  width: 450px;
`;

const SearchBar = styled.input`
  flex: 2;
  padding: 10px;
  font-size: 16px;
  margin: 0 20px;
  width: 300px;
  border-radius: 5px;
`;

const ThirdLayer = styled.nav`
  position: sticky; // Make this layer sticky
  top: 0; // Stick to the top of the viewport
  background-color: #000;
  color: #fff;
  display: flex;
  justify-content: center;
  gap: 15px;
  padding: 10px 0;
  width: 100%; // Ensure full width
  z-index: 20; // Ensure it is above other content when scrolling
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  padding: 10px 15px;
  font-size: 16px;

  &:hover {
    background-color: #333;
  }
`;
const NavLink2 = styled(Link)`
  color: blue;
  text-decoration: none;
  padding: 10px 15px;
  font-size: 18px;

  &:hover {
    background-color: #333;
  }
`;
const Center1 = styled.div`
  max-width: 100%;
  margin: 0 auto;
`;

// Rest of the existing components...

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);

  return (
    <StyledHeader>
      <TopLayer>
        <div>
          Modvise.lk Customer Care Hotline +94 712 695 878 / 0112 611 337
        </div>
        <div>ISLAND WIDE DELIVERY</div>
      </TopLayer>
      <Center1>
        <SecondLayer>
          <div>
            <Logo href={"/"}>
              <img
                src="/logo.jpg"
                alt="Mod Vise Logo"
                style={{ maxWidth: "250px" }}
              />
            </Logo>
          </div>
          <div>
            <Link href={"/search"}>
              <SearchBar type="text" placeholder="Search..." />
            </Link>
          </div>
          <div>
            <NavLink2 href={"/cart"}>
              Cart ({cartProducts.length})&nbsp;
            </NavLink2>
            <NavLink2 href={"/account"}>My Account &nbsp;&nbsp;</NavLink2>
          </div>
        </SecondLayer>
        <ThirdLayer>
          <NavLink href={"/"}>Home</NavLink>
          <NavLink href={"/products"}>All products</NavLink>
          <NavLink href={"/categories"}>Categories</NavLink>
          <NavLink href={"/aboutUs"}>About Us</NavLink>
        </ThirdLayer>
      </Center1>
      <BottomLayer />
    </StyledHeader>
  );
}
