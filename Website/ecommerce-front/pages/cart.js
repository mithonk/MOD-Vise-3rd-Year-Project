import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import { RevealWrapper } from "next-reveal";
import { useSession } from "next-auth/react";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 40px;
  margin-top: 40px;
  margin-bottom: 40px;
  table thead tr th:nth-child(3),
  table tbody tr td:nth-child(3),
  table tbody tr.subtotal td:nth-child(2) {
    text-align: right;
  }
  table tr.subtotal td {
    padding: 15px 0;
  }
  table tbody tr.subtotal td:nth-child(2) {
    font-size: 1.4rem;
  }
  tr.total td {
    font-weight: bold;
  }
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
  button {
    padding: 0 !important;
  }
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 6px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [shippingFee, setShippingFee] = useState(null);
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios
        .post("/api/cart", { ids: cartProducts.map((item) => item.id) })
        .then((response) => {
          setProducts(response.data);
        });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
    axios.get("/api/settings?name=shippingFee").then((res) => {
      setShippingFee(res.data.value);
    });
  }, []);
  useEffect(() => {
    if (!session) {
      return;
    }
    axios.get("/api/address").then((response) => {
      setName(response?.data?.name);
      setEmail(response?.data?.email);
      setPhoneNumber(response?.data?.phoneNumber);
      setAddress(response?.data?.address);
      setCity(response?.data?.city);
      setDistrict(response?.data?.district);
    });
  }, [session]);
  function moreOfThisProduct(id, size) {
    addProduct(id, size);
  }
  function lessOfThisProduct(id, size) {
    removeProduct(id, size);
  }

  async function goToPayment() {
    // Regular expressions for validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation pattern
    const phonePattern = /^07[1,2,5,6,7,8][0-9]{7}$/;

    // Check if fields are empty
    if (
      !name.trim() ||
      !email.trim() ||
      !phoneNumber.trim() ||
      !address.trim() ||
      !city.trim() ||
      !district.trim()
    ) {
      alert("Please fill in all fields.");
      return;
    }

    // Validate email and phone number
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!phonePattern.test(phoneNumber)) {
      alert("Please enter a valid phone number.");
      return;
    }

    const response = await axios.post("/api/checkout", {
      name,
      email,
      phoneNumber,
      address,
      city,
      district,
      cartProducts,
    });
    if (response.data.url) {
      ls?.setItem("cart", JSON.stringify([]));
      window.location = response.data.url;
    }
  }
  async function payAfterDeliver() {
    // Regular expressions for validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation pattern
    const phonePattern = /^07[1,2,5,6,7,8][0-9]{7}$/;

    // Check if fields are empty
    if (
      !name.trim() ||
      !email.trim() ||
      !phoneNumber.trim() ||
      !address.trim() ||
      !city.trim() ||
      !district.trim()
    ) {
      alert("Please fill in all fields.");
      return;
    }

    // Validate email and phone number
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!phonePattern.test(phoneNumber)) {
      alert("Please enter a valid phone number.");
      return;
    }

    try {
      const response = await axios.post("/api/deliverPay", {
        name,
        email,
        phoneNumber,
        address,
        city,
        district,
        cartProducts,
      });

      if (response.data.message === "Order placed successfully") {
        alert("Your order has been placed. You can pay when it is delivered.");
        clearCart();
        // Optionally redirect or update the page state
      } else {
        alert("There was a problem placing your order. Please try again.");
      }
    } catch (error) {
      alert("An error occurred while placing your order. Please try again.");
    }
  }
  let productsTotal = 0;
  for (const product of cartProducts) {
    const price = products.find((p) => p._id === product.id)?.price || 0;
    productsTotal += price;
  }

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thanks for your order!</h1>
              <p>We will email you when your order will be sent.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }
  const mergedCartProducts = cartProducts.reduce((obj, item) => {
    const objCopy = [...obj];
    const extItemIndex = objCopy.findIndex(
      (i) => i.id == item.id && i.size == item.size
    );
    console.log(extItemIndex);
    if (extItemIndex !== -1) {
      objCopy[extItemIndex] = {
        ...objCopy[extItemIndex],
        quantity: objCopy[extItemIndex]?.quantity + 1,
      };
    } else {
      objCopy.push({
        ...item,
        quantity: 1,
        product: products.find((i) => i._id == item.id),
      });
    }
    return objCopy;
  }, []);
  mergedCartProducts.sort((a, b) => (a.id > b.id ? 1 : -1));
  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <RevealWrapper delay={0}>
            <Box>
              <h2>Cart</h2>
              {!cartProducts?.length && <div>Your cart is empty</div>}
              {products?.length > 0 && (
                <Table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mergedCartProducts.map((product) => {
                      return (
                        <tr>
                          <ProductInfoCell>
                            <ProductImageBox>
                              <img src={product.product.images[0]} alt="" />
                            </ProductImageBox>
                            {product.product.title}
                            <div>{`Size :${product.size}`}</div>
                          </ProductInfoCell>
                          <td>
                            <Button
                              onClick={() =>
                                lessOfThisProduct(product.id, product.size)
                              }
                            >
                              -
                            </Button>
                            <QuantityLabel>{product.quantity}</QuantityLabel>
                            <Button
                              onClick={() =>
                                moreOfThisProduct(product.id, product.size)
                              }
                            >
                              +
                            </Button>
                          </td>
                          <td>
                            රු {product.quantity * product.product.price}.00
                          </td>
                        </tr>
                      );
                    })}
                    <tr className="subtotal">
                      <td colSpan={2}>Products</td>
                      <td>රු {productsTotal}.00</td>
                    </tr>
                    <tr className="subtotal">
                      <td colSpan={2}>Delivery</td>
                      <td>රු {shippingFee}.00</td>
                    </tr>
                    <tr className="subtotal total">
                      <td colSpan={2}>Total</td>
                      <td>
                        රු {productsTotal + parseInt(shippingFee || 0)}.00
                      </td>
                    </tr>
                  </tbody>
                </Table>
              )}
            </Box>
          </RevealWrapper>
          {!!cartProducts?.length && (
            <RevealWrapper delay={100}>
              <Box>
                <h2>Order Information</h2>
                <Input
                  type="text"
                  placeholder="Name"
                  value={name}
                  name="name"
                  onChange={(ev) => setName(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={(ev) => setEmail(ev.target.value)}
                />

                <Input
                  type="text"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  name="phoneNumber"
                  onChange={(ev) => setPhoneNumber(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Street Address"
                  value={address}
                  name="address"
                  onChange={(ev) => setAddress(ev.target.value)}
                />

                <Input
                  type="text"
                  placeholder="Home Town"
                  value={city}
                  name="city"
                  onChange={(ev) => setCity(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="District"
                  value={district}
                  name="district"
                  onChange={(ev) => setDistrict(ev.target.value)}
                />
                <Button black block onClick={goToPayment}>
                  Continue to payment
                </Button>
                <br />
                <Button black block onClick={payAfterDeliver}>
                  Pay On Delivery
                </Button>
              </Box>
            </RevealWrapper>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
