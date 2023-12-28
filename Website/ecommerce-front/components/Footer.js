import React, { useState } from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  background-color: #091e40;
  color: #fff;
  padding: 5px 0;
  width: 100%;
  margin-top: 20px;
`;

const FooterContainer = styled.div`
  background-color: #091e40;
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const FooterColumn = styled.div`
  margin: 20px;
  text-align: left;

  h3 {
    font-size: 20px;
    font-weight: bold;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
  }

  a {
    color: #fff;
    text-decoration: none;
  }
`;

const EmailInput = styled.input`
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #fff;
  border-radius: 5px;
  color: #091e40;
  background-color: #fff;

  &:focus {
    outline: none;
    border-color: #f90;
    box-shadow: 0 0 8px 0 #f90;
  }
`;
const SubmitButton = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  background-color: #f90;
  color: #091e40;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #fb3;
  }
`;

const ErrorMessage = styled.p`
  color: #f90;
  margin-top: 5px;
`;

const SuccessMessage = styled.p`
  color: #0f0;
  margin-top: 5px;
`;
const Copyright = styled.p`
  font-size: 14px;
  text-align: center;
`;

export default function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const handleSubscribe = () => {
    if (validateEmail(email)) {
      setSuccess(true);
      setError("");
      // Here you could also make an API call to register the email
    } else {
      setError("Please enter a valid email address.");
      setSuccess(false);
    }
  };
  return (
    <StyledFooter>
      <FooterContainer>
        <FooterContent>
          <FooterColumn>
            <h3>ABOUT</h3>
            <ul>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Bata World Wide</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Gift Cards</a>
              </li>
              <li>
                <a href="#">Store Network</a>
              </li>
            </ul>
          </FooterColumn>
          <FooterColumn>
            <h3>Help</h3>
            <ul>
              <li>
                <a href="#">My Account</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Terms and Conditions</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
            </ul>
          </FooterColumn>
          <FooterColumn>
            <h3>Follow</h3>
            <ul>
              <li>
                <a href="#">Facebook</a>
              </li>
              <li>
                <a href="#">Instagram</a>
              </li>
              <li>
                <a href="#">YouTube</a>
              </li>
            </ul>
          </FooterColumn>
          <FooterColumn>
            <h3>Sign UP</h3>
            <ul>
              <li>Sign Up to Our Newsletter</li>
              <li>
                <EmailInput
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />{" "}
                &nbsp;
                <SubmitButton onClick={handleSubscribe}>Submit</SubmitButton>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {success && (
                  <SuccessMessage>
                    You've successfully subscribed to our store!
                  </SuccessMessage>
                )}
              </li>
            </ul>
          </FooterColumn>
        </FooterContent>
        <Copyright>
          Mod ViseShoeStore &copy; {new Date().getFullYear()}
        </Copyright>
      </FooterContainer>
    </StyledFooter>
  );
}
