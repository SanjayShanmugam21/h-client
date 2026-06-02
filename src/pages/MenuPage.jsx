import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import api from "../services/api";
import { useCart } from "../context/CartContext";

// Swiper Styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const HotelHayaathMenu = () => {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [menuCards, setMenuCards] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // null means "All"
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, cardsRes, foodRes] = await Promise.all([
          api.get("/categories"),
          api.get("/menu-cards"),
          api.get("/foods") // Initial load of all foods
        ]);
        setCategories(catRes.data || []);
        setMenuCards(cardsRes.data?.filter(c => c.isActive) || []);
        setFoods(foodRes.data || []);
      } catch (err) {
        console.error("Failed to fetch menu data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
    setLoading(true);
    try {
      const url = category ? `/foods?category=${category._id}` : "/foods";
      const { data } = await api.get(url);
      setFoods(data);
    } catch (err) {
      console.error("Error filtering products:", err);
    } finally {
      setLoading(false);
    }
  };

  const Particles = () => (
    <div className="particles-container">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="particle"
          animate={{ y: [0, -100, 0], opacity: [0, 0.6, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, delay: Math.random() * 5 }}
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
        />
      ))}
    </div>
  );

  if (loading && foods.length === 0) return <div className="loader-container"><div className="spinner-border text-gold"></div></div>;

  return (
    <div className="hayaath-menu-section">
      <Particles />

      <div className="container py-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-5 mt-5"
        >
          <span className="gold-text-tag text-uppercase">The Royal Collection</span>
          <h1 className="display-4 font-playfair gold-gradient-text fw-bold">Our Gourmet Menu</h1>
          <div className="luxury-divider"></div>
        </motion.div>

        {/* --- DIGITAL MENU CARDS SLIDER --- */}
        {menuCards.length > 0 && (
          <div className="mb-5 px-3">
            <div className="text-center mb-4">
              <h4 className="font-playfair gold-text">Menu Booklet</h4>
              <p className="text-white-50 small">Swipe to browse our traditional menu pages</p>
            </div>
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 4000 }}
              pagination={{ clickable: true }}
              navigation={true}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="menu-cards-swiper pb-5"
            >
              {menuCards.map((card) => (
                <SwiperSlide key={card._id}>
                  <div className="menu-card-slide-item">
                    <img src={card.image} alt={card.title} className="card-img-fit" />
                    <div className="card-title-overlay">
                      <h5 className="mb-1 font-playfair">{card.title}</h5>
                      <p className="small mb-0 opacity-75">{card.description}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* --- CATEGORY TABS (Matching Image Layout) --- */}
        <div className="category-tabs-container mb-5">
          <div className="tabs-wrapper">
            <button
              className={`tab-btn ${!selectedCategory ? 'active' : ''}`}
              onClick={() => handleCategoryChange(null)}
            >
              All Items
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id}
                className={`tab-btn ${selectedCategory?._id === cat._id ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* --- FOOD ITEMS GRID (Matching Image Layout) --- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory ? selectedCategory._id : "all"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="row g-4 px-md-4"
          >
            {foods.map((food) => (
              <div key={food._id} className="col-lg-6">
                <motion.div
                  className="menu-item-card-horizontal"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="item-img-container shadow-lg">
                    <img src={food.image} alt={food.name} loading="lazy" />
                    {food.rating >= 4.5 && <div className="item-badge">Bestseller</div>}
                  </div>
                  <div className="item-info">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h3 className="item-name font-playfair">{food.name}</h3>
                      <div className="price-tag-wrap">
                        <span className="item-price gold-gradient-text">₹{food.price}</span>
                      </div>
                    </div>
                    <p className="item-desc">{food.description || "Traditional recipe infused with secret royal spices."}</p>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <div className="item-rating">
                        {"★".repeat(Math.round(food.rating || 4.5))}
                        <span className="opacity-50 ms-1" style={{ fontSize: '0.7rem' }}>({food.rating || 4.5})</span>
                      </div>
                      <button className="add-cart-btn-premium" onClick={() => addToCart(food)}>
                        Add to Feast <span className="ms-1">+</span>
                      </button>
                    </div>
                  </div>
                </motion.div>

              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {foods.length === 0 && (
          <div className="text-center py-5">
            <p className="text-white-50">No items found in this category.</p>
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@300;400;600&display=swap');

        :root {
          --black: #0a0a0a;
          --dark-green: #0b3d2e;
          --gold: #d4af37;
          --soft-gold: #f5e7a3;
        }

        .hayaath-menu-section {
          background: #050505;
          min-height: 100vh;
          position: relative;
          color: white;
          font-family: 'Poppins', sans-serif;
        }

        .font-playfair { font-family: 'Playfair Display', serif; }

        .gold-text { color: var(--gold); }
        .gold-text-tag { color: var(--gold); font-size: 0.8rem; letter-spacing: 3px; font-weight: 600; }
        
        .gold-gradient-text {
          background: linear-gradient(to bottom, var(--soft-gold) 0%, var(--gold) 50%, #b38728 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .luxury-divider {
          width: 60px;
          height: 2px;
          background: var(--gold);
          margin: 20px auto;
        }

        /* --- Category Tabs (Image-like) --- */
        .category-tabs-container {
          border-bottom: 2px solid rgba(212, 175, 55, 0.2);
          padding-bottom: 0;
          text-align: center;
        }
        .tabs-wrapper {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0;
        }
        .tab-btn {
          background: transparent;
          border: none;
          color: white;
          padding: 12px 30px;
          text-transform: uppercase;
          font-weight: 600;
          font-size: 0.9rem;
          letter-spacing: 1px;
          transition: all 0.3s;
          position: relative;
        }
        .tab-btn.active {
          background: var(--gold);
          color: black;
        }
        .tab-btn:hover:not(.active) {
          color: var(--gold);
        }

        /* --- Menu item card (Image-like) --- */
        .menu-item-card-horizontal {
          display: flex;
          gap: 20px;
          padding: 20px;
          background: rgba(255,255,255,0.02);
          border-radius: 12px;
          transition: 0.3s;
          height: 100%;
        }
        .menu-item-card-horizontal:hover {
          background: rgba(255,255,255,0.05);
          transform: translateX(5px);
        }
        .item-img-container {
          width: 120px;
          height: 120px;
          flex-shrink: 0;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(212, 175, 55, 0.3);
          position: relative;
        }
        .item-badge {
          position: absolute;
          top: 0;
          left: 0;
          background: var(--gold);
          color: black;
          font-size: 0.6rem;
          font-weight: 700;
          padding: 2px 8px;
          text-transform: uppercase;
          border-bottom-right-radius: 8px;
        }
        .item-img-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }
        .menu-item-card-horizontal:hover .item-img-container img {
          transform: scale(1.1);
        }
        .item-info {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .item-name {
          font-size: 1.3rem;
          margin: 0;
          color: white;
          letter-spacing: 0.5px;
        }
        .item-price {
          font-weight: 700;
          font-size: 1.2rem;
        }
        .item-desc {
          color: rgba(255,255,255,0.5);
          font-size: 0.8rem;
          margin-bottom: 12px;
          line-height: 1.4;
          font-weight: 300;
        }
        .item-rating {
          color: var(--gold);
          font-size: 0.8rem;
        }
        .add-cart-btn-premium {
          background: linear-gradient(135deg, var(--gold) 0%, #b38728 100%);
          border: none;
          color: black;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 6px 16px;
          border-radius: 20px;
          transition: all 0.3s;
          box-shadow: 0 4px 10px rgba(212, 175, 55, 0.2);
        }
        .add-cart-btn-premium:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(212, 175, 55, 0.4);
          filter: brightness(1.1);
        }


        /* Particles */
        .particles-container { position: absolute; inset: 0; pointer-events: none; }
        .particle { position: absolute; width: 3px; height: 3px; background: var(--gold); border-radius: 50%; opacity: 0.3; }

        /* Menu Cards Swiper */
        .menu-card-slide-item {
          height: 480px;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          border: 1px solid rgba(212, 175, 55, 0.3);
        }
        .card-img-fit { width: 100%; height: 100%; object-fit: cover; }
        .card-title-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 25px;
          background: linear-gradient(to top, rgba(0,0,0,0.95) 20%, transparent 100%);
        }
        .menu-cards-swiper .swiper-pagination-bullet-active { background: var(--gold) !important; }
        .menu-cards-swiper .swiper-button-next, .menu-cards-swiper .swiper-button-prev {
          color: var(--gold) !important;
          background: rgba(0,0,0,0.5);
          width: 40px; height: 40px; border-radius: 50%; border: 1px solid var(--gold);
        }

        @media (max-width: 576px) {
          .menu-item-card-horizontal { flex-direction: column; text-align: center; }
          .item-img-container { margin: 0 auto; width: 140px; height: 140px; }
          .item-info .d-flex { flex-direction: column; align-items: center !important; }
        }
      `}</style>
    </div>
  );
};

export default HotelHayaathMenu;