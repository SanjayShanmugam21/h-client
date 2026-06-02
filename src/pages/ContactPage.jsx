import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import "./HomePage.css"; // Reusing common styles

const ContactPage = () => {
  return (
    <div className="contact-page">
      {/* --- Page Header --- */}
      <section className="py-5 text-center bg-dark bg-opacity-50">
        <Container className="py-5">
          <span className="section-tag">Connect</span>
          <h1 className="display-3 fw-bold text-white mb-3 font-playfair">Get In Touch</h1>
          <p className="lead text-white-50 mx-auto" style={{ maxWidth: '700px' }}>
            We're here to serve you. Reach out for dine-in, catering, or feedback.
          </p>
        </Container>
      </section>

      {/* --- Feedback & Contact Section --- */}
      <section className="py-5">
        <Container className="py-5">
          <Row className="g-5">
            {/* Left: Contact Info */}
            <Col lg={5}>
              <span className="section-tag">Find Us</span>
              <h2 className="section-title text-start mb-4">Visit the Palace <br /> of Flavors</h2>
              <p className="text-white-50 mb-5">
                Visit our flagship restaurant in the heart of the city or join the conversation online.
              </p>

              <div className="contact-info-grid">
                <Card className="contact-card border-0 bg-transparent mb-4">
                  <Card.Body className="p-0">
                    <span className="contact-icon" style={{ fontSize: '2rem' }}>📍</span>
                    <h5 className="text-secondary mt-2">Address</h5>
                    <p className="small text-white-50 m-0">123 Royal Street, Nawab Chowk, Hyderabad - 500001</p>
                  </Card.Body>
                </Card>
                <Card className="contact-card border-0 bg-transparent">
                  <Card.Body className="p-0">
                    <span className="contact-icon" style={{ fontSize: '2rem' }}>📞</span>
                    <h5 className="text-secondary mt-2">Phone</h5>
                    <p className="small text-white-50 m-0">+91 98765 43210 <br /> 040-2345-6789</p>
                  </Card.Body>
                </Card>
              </div>
            </Col>

            {/* Right: Feedback Form */}
            <Col lg={7}>
              <Card className="feedback-form shadow-2xl border-0 bg-dark bg-opacity-50 p-4 rounded-5">
                <Card.Body>
                  <h3 className="h2 mb-4 text-secondary">Share Your Experience</h3>
                  <p className="text-white-50 mb-5">Your feedback helps us maintain the royalty of our taste.</p>

                  <Form onSubmit={(e) => e.preventDefault()}>
                    <Row className="g-4 mb-4">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Control className="form-control-custom" placeholder="Full Name" />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Control type="email" className="form-control-custom" placeholder="Email Address" />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-4">
                      <Form.Control as="textarea" rows={4} className="form-control-custom" placeholder="Your message..." />
                    </Form.Group>

                    <Button type="submit" className="slide-order-btn w-100 border-0 mt-2 py-3 fw-bold">
                      Submit Feedback
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default ContactPage;
