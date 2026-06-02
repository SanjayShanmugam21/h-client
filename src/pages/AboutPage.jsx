import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-hayaath">
      <Container>
        <Row className="align-items-stretch">
          {/* --- Left Column: Two Vertical Images --- */}
          <Col lg={6} className="about-images-column">
            <div className="about-image-wrapper">
              <img src="/images/chef.jpeg" alt="Our Master Chef" />
            </div>
            <div className="about-image-wrapper">
              <img src="/images/interior.png" alt="Restaurant Interior" />
            </div>
          </Col>

          {/* --- Right Column: Text Content --- */}
          <Col lg={6} className="about-content-column">
            <p className="script-subheading">This is our secrets</p>
            <h1 className="main-about-heading">Perfect Ingredients</h1>

            <div className="about-description">
              <p>
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts. Separated they
                live in Bookmarksgrove right at the coast of the Semantics, a large
                language ocean.
              </p>
              <p>
                A small river named Duden flows by their place and supplies it with
                the necessary regelialia. It is a paradisematic country, in which
                roasted parts of sentences fly into your mouth.
              </p>
            </div>

            <Link to="/menu" className="learn-more-btn">
              Learn more
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutPage;
