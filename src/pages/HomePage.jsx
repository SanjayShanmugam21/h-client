import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import "./HomePage.css";

const HomePage = () => (
  <main className="home-page-container">
    {/* --- HERO CAROUSEL --- */}
    <section className="biryani-carousel-section">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={true}
        loop={true}
        className="biryani-swiper"
      >
        <SwiperSlide>
          <div className="carousel-slide" style={{ backgroundImage: "url('/images/biryani_slide.png')" }}>
            <div className="slide-overlay"></div>
            <Container className="slide-content">
              <div className="slide-text">
                <span className="dish-tag">Chef Special</span>
                <h1>Siraga Samba <br /> <span>Biryani</span></h1>
                <p>Traditional flavor with aromatic small-grain rice, slow-cooked to perfection.</p>
                <Link to="/menu" className="slide-order-btn">Order Now</Link>
              </div>
            </Container>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="carousel-slide" style={{ backgroundImage: "url('/images/drinks_slide.png')" }}>
            <div className="slide-overlay bright-overlay"></div>
            <Container className="slide-content">
              <div className="slide-text">
                <span className="dish-tag">Fresh & Cold</span>
                <h1>Refreshing <br /> <span>Cool Drinks</span></h1>
                <p>Beat the heat with our chilled variety of hand-crafted beverages and juices.</p>
                <Link to="/menu" className="slide-order-btn">Explore Drinks</Link>
              </div>
            </Container>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="carousel-slide" style={{ backgroundImage: "url('/images/snacks_slide.png')" }}>
            <div className="slide-overlay bold-overlay"></div>
            <Container className="slide-content">
              <div className="slide-text">
                <span className="dish-tag">Hot & Tasty</span>
                <h1>Delicious <br /> <span>Snacks</span></h1>
                <p>Crispy Chicken Rolls, French Fries, and Steamed Momos – satisfying bites for every craving.</p>
                <Link to="/menu" className="slide-order-btn">View Snacks</Link>
              </div>
            </Container>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>

    {/* --- FEATURED SECTIONS TEASER --- */}
    <Container className="py-5">
      <Row className="g-5 align-items-center">
        <Col lg={6}>
          <img src="/images/aadhil.jpeg" className="process-img shadow-lg w-100 rounded-5" alt="Master Chef" />
        </Col>
        <Col lg={6}>
          <span className="section-tag">Our Heritage</span>
          <h2 className="section-title text-start mb-4">Crafting Memories <br /> Since Generations</h2>
          <p className="lead mb-4 text-white-50">
            From the secret 'Dum' techniques to hand-picked aromatic spices, every dish at Hotel Hayaath is a tribute to our royal culinary history.
          </p>
          <Button as={Link} to="/about" variant="outline-warning" size="lg" className="rounded-pill px-5">
            Our Full Story
          </Button>
        </Col>
      </Row>
    </Container>

    {/* --- VISUAL SHOWCASE --- */}
    <section className="bg-dark bg-opacity-50 py-5">
      <Container className="py-4">
        <div className="text-center mb-5">
          <span className="section-tag">The Gallery</span>
          <h2 className="section-title">Royal Masterpieces</h2>
        </div>
        <Row className="g-4">
          <Col md={10} className="mx-auto text-center">
            <img src="/images/gallery.png" className="w-100 rounded-5 shadow-lg border border-secondary border-opacity-25" alt="Gallery" />
          </Col>
        </Row>
      </Container>
    </section>

    {/* --- MONTHLY SPECIALS --- */}
    <section className="py-5" style={{ background: '#080808' }}>
      <Container className="py-5">
        <div className="mb-5 text-center">
          <span className="section-tag">Chef's Table</span>
          <h2 className="section-title">Monthly Specials</h2>
        </div>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Autoplay]}
          className="special-swiper"
        >
          {[
            { name: "Saffron Mutton Mandi", img: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80", price: "750" },
            { name: "Creamy Malai Tikka", img: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=600&q=80", price: "450" },
            { name: "Hyathh Special Dessert", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80", price: "290" },
          ].map((item, i) => (
            <SwiperSlide key={i}>
              <div className="special-slide-card">
                <div className="special-img-wrap">
                  <img src={item.img} alt={item.name} className="w-100 h-100 object-fit-cover" loading="lazy" />
                  <div className="special-price">₹{item.img ? item.price : "???"}</div>
                </div>
                <div className="special-info p-4">
                  <h4 className="m-0 font-playfair">{item.name}</h4>
                  <Link to="/menu" className="text-secondary small text-decoration-none mt-2 d-inline-block">Order Online →</Link>
                </div>
              </div>
            </SwiperSlide>
          ))}

        </Swiper>
      </Container>
    </section>

    {/* --- HIGH ENERGY CTA --- */}
    <section className="px-3">
      <Container className="bg-secondary bg-opacity-10 border border-secondary border-opacity-25 rounded-5 p-5 text-center my-5 position-relative overflow-hidden">
        <div className="z-2 position-relative">
          <h2 className="display-4 fw-bold mb-4">Hungry for <br /> <span className="text-secondary">True Royalty?</span></h2>
          <p className="lead text-white-50 mb-5 max-width-600 mx-auto">Get your favorite Biryani delivered hot to your doorstep in 45 minutes or less!</p>
          <Button as={Link} to="/menu" variant="warning" size="lg" className="px-5 rounded-pill fw-bold py-3 shadow-lg">
            Order Online Now
          </Button>
        </div>
      </Container>
    </section>
  </main>
);

export default HomePage;