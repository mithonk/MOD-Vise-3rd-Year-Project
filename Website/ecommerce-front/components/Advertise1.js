import styled from "styled-components";
import Link from "next/link";

const Title = styled.h2`
  font-size: 1.5rem;
  margin: 30px 0 20px;
  font-weight: normal;
  font-family: Georgia, "Times New Roman", Times, serif;
  text-align: center;
`;

export default function Advertise1() {
  return (
    <>
      <br />
      <br />
      <Title>BATA Sale Products AT Mod Vise</Title>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img
          src="/bata1.png"
          style={{ width: "49%", height: "500px", padding: "5px" }}
        />
        <img
          src="/shoe1.png"
          style={{ width: "49%", height: "500px", padding: "5px" }}
        />
      </div>
      <br />
      <br />
      <h2 style={{ textAlign: "center", color: "#327fa8" }}>Brands We Stock</h2>
      <h4 style={{ textAlign: "center" }}>
        We pick the very best so you can be assured of the quality. There can be
        no compromises when it comes to materials, ease of wear, and durability.
      </h4>
      <div style={{ textAlign: "center" }}>
        <img src="/brands.png" />
      </div>
      <br />
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div>
          <h3 style={{ fontFamily: "fantasy" }}>Island wide Delivery</h3>
          <p style={{ fontFamily: "cursive" }}>Doorstep Delivery</p>
        </div>
        <div>
          <h3 style={{ fontFamily: "fantasy" }}>Hassle Free Purchase</h3>
          <p style={{ fontFamily: "cursive" }}> Trusted Name</p>
        </div>
        <div>
          <h3 style={{ fontFamily: "fantasy" }}>International Warranty</h3>
          <p style={{ fontFamily: "cursive" }}>
            Offered in the country of usage
          </p>
        </div>
        <div>
          <h3 style={{ fontFamily: "fantasy" }}>100% Secure Checkout</h3>
          <p style={{ fontFamily: "cursive" }}>PayPal / MasterCard / Visa</p>
        </div>
      </div>
    </>
  );
}
