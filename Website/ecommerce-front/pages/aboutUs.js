import React from "react";
import styled from "styled-components";
import Header from "@/components/Header";
import Center from "@/components/Center";
import Footer from "@/components/Footer";

const PageWrapper = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  box-sizing: border-box;
`;

const AboutSection = styled.div`
  padding: 50px;
  text-align: center;
  background-color: #474e5d;
  color: white;
`;

const TeamSection = styled.div`
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  color: grey;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Column = styled.div`
  flex: 0 0 33.3%;
  margin-bottom: 16px;
  padding: 0 8px;
`;

const Card = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 8px;
  background-color: white;
`;

const Container = styled.div`
  padding: 2px 16px;
`;

const Button = styled.button`
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #555;
  }
`;

const MapWrapper = styled.div`
  iframe {
    width: 100%;
    height: 400px;
    border: 1px solid #ccc; /* Add border */
  }
`;
const ContactUsButton = styled.a`
  display: inline-block;
  padding: 10px 20px;
  background-color: #0072c6;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s;
  margin-top: 20px;

  &:hover {
    background-color: #005a9e;
  }
`;
const TwoMapsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-left: 10px;
  iframe {
    width: 45%;
    height: 400px;
    border: 1px solid #222; /* Add border */
  }
`;

const CompanyDetails = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  text-align: center;
`;

const AwardsSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 15px;
`;

const Award = styled.iframe`
  width: 47%;
  height: 400px;
  border: 2px solid #222;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;

  a {
    text-decoration: none;
    margin: 0 10px;
  }
`;

const SocialIconImage = styled.img`
  width: 24px;
  height: 24px;
`;

const AboutUsPage = () => {
  return (
    <PageWrapper>
      <Header />
      {/* <AboutSection>
        <Title>About Us</Title>
        <p>
          We are a passionate team dedicated to providing the best products and
          services. Get to know us below.
        </p>
      </AboutSection> */}

      <CompanyDetails>
        <h2>Store Details</h2>
        <p>1st Store: Maggona, Kalutara</p>
        <p>2nd Store: Pallabedda, Ratnapura</p>
        <SocialIcons>
          <a href="https://www.facebook.com/" target="_blank">
            <SocialIconImage src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png" />
          </a>
          <a href="https://www.instagram.com/" target="_blank">
            <SocialIconImage src="https://w7.pngwing.com/pngs/704/270/png-transparent-social-media-instagram-login-graphy-ig-instagram-icon-rectangle-magenta-mobile-phones-thumbnail.png" />
          </a>
          <a href="mailto:info@company.com" target="_blank">
            <SocialIconImage src="https://w7.pngwing.com/pngs/745/644/png-transparent-email-logo-icon-email-black-envelope-logo-miscellaneous-text-mobile-phones-thumbnail.png" />
          </a>
        </SocialIcons>
        <ContactUsButton href="https://wa.me/+94777609615" target="_blank">
          Contact Us on WhatsApp (Instant Replies)
        </ContactUsButton>
      </CompanyDetails>
      <TwoMapsWrapper>
        <h3> Maggona &nbsp;</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31713.10712932641!2d79.94473871083984!3d6.504159700000021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae231b94b517505%3A0x1197f58b2d4fdc24!2sDSI%20Shoes!5e0!3m2!1sen!2slk!4v1699023360718!5m2!1sen!2slk"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Google Maps 1"
        ></iframe>

        <h3>&nbsp; Ratnapura &nbsp;</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4111.235682680408!2d80.70573541393209!3d6.481568211337065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3fa10300046c7%3A0xe71c2ad9b9ea4a5a!2sMod%20%26%20Mod!5e0!3m2!1sen!2slk!4v1699025608605!5m2!1sen!2slk"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Google Maps 2"
        ></iframe>
      </TwoMapsWrapper>
      <TeamSection>
        <Title>Our Team</Title>
        <Row>
          <Column>
            <Card>
              <img
                src="https://media.istockphoto.com/id/1358106560/photo/portrait-of-a-male-owner-in-his-shoe-store.jpg?s=612x612&w=0&k=20&c=CoNHmdI_rzDeP97GZ26tX9InyFr7twzb1MoRUx88vic="
                alt="Jane"
                style={{ width: "100%" }}
              />
              <Container>
                <h2>Azmi Abdhullah</h2>
                <p className="title">Founder</p>
                <p>Hard working, Goal-oriented Individual</p>
                <p>azmi125@gmail.com</p>
                <p>
                  <Button>Contact</Button>
                </p>
              </Container>
            </Card>
          </Column>
          <Column>
            <Card>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKvvFlmOjCmzf6-giiI2BXCiTWMPwdxvRv73J3CTUrmXqzV2LQ8bCcxvWaaBu71azTPYs&usqp=CAU"
                alt="Mike"
                style={{ width: "420px", height: "280px" }}
              />
              <Container>
                <h2>Mohamed Azmi</h2>
                <p className="title">Director</p>
                <p>In charge of ModVise Maggona Branch</p>
                <p>mohomedAzmi23@gmail.com</p>
                <p>
                  <Button>Contact</Button>
                </p>
              </Container>
            </Card>
          </Column>
          <Column>
            <Card>
              <img
                src="https://media.gettyimages.com/id/1201646474/photo/skate-shop-owner.jpg?s=612x612&w=gi&k=20&c=G5EezlbF49S_iR8HtFNouRtA9TGNPc3bektCjal21PQ="
                alt="John"
                style={{ width: "100%" }}
              />
              <Container>
                <h2>Abdhul Azeez</h2>
                <p className="title">Head of Sales and Purchasing</p>
                <p>Young, Intelligent Maintaining Sales and Purchasing</p>
                <p>abdazez@gmail.com</p>
                <p>
                  <Button>Contact</Button>
                </p>
              </Container>
            </Card>
          </Column>
        </Row>
      </TeamSection>
      <h2 style={{ textAlign: "center" }}>Our Recent Awards</h2>
      <AwardsSection>
        <Award
          src="https://media.licdn.com/dms/image/D5603AQHfDtfNv_od9Q/profile-displayphoto-shrink_800_800/0/1679830373859?e=2147483647&v=beta&t=bKBni6TB5o1AVyt8Wo8aHTLXX0NHWQ6vxqnyVmvGw1c"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Recent Award 1"
        ></Award>
        <Award
          src="https://asianmirror.lk/media/k2/items/cache/4d0859b932b4c24a46e660e2bfc8d1a9_L.webp"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Recent Award 2"
        ></Award>
      </AwardsSection>
      <Footer />
    </PageWrapper>
  );
};

export default AboutUsPage;
