import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories, products } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import CountdownTimer from '../components/CountdownTimer';
import './HomePage.css';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'living', label: 'Living' },
    { id: 'dining', label: 'Dining' },
    { id: 'decor', label: 'Decor' }
  ];

  // Filter products by category for Trending section
  const trendingProducts = products.filter(product => {
    if (activeTab === 'all') return true;
    if (activeTab === 'decor') {
      // Treat living accessories/wellness as decor in this context
      return product.category === 'living' || product.category === 'wellness';
    }
    return product.category === activeTab;
  }).slice(0, 4);

  return (
    <div className="home-page fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-badge">NEW COLLECTION</span>
          <h1 className="hero-title">Quality Essentials,<br />Simplified.</h1>
          <p className="hero-subtitle">
            Elevate your everyday with our curated selection of premium, mindfully designed products. Function meets flawless form.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => navigate('/shop/all')} id="hero-shop-btn">
              Shop Collection
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/shop/collections')} id="hero-explore-btn">
              Explore Catalog
            </button>
          </div>
        </div>
      </section>

      {/* Promo banner with Live Countdown */}
      <section className="promo-banner">
        <div className="promo-banner-inner">
          <div className="promo-info">
            <span className="promo-icon-wrap">🔥</span>
            <div>
              <h3 className="promo-title">Flash Event: 20% Off Select Essentials</h3>
              <p className="promo-code">Use code <strong className="promo-code-text">SIMPLY20</strong> at checkout.</p>
            </div>
          </div>
          
          <div className="promo-countdown-wrap">
            <CountdownTimer durationHours={12} />
            <button className="btn btn-primary btn-sm promo-btn" onClick={() => navigate('/shop/wellness')} id="promo-shop-event-btn">
              Shop Event
            </button>
          </div>
        </div>
      </section>

      {/* Curated Categories */}
      <section className="categories-section container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Curated Categories</h2>
            <p className="section-subtitle">Discover items tailored to your lifestyle.</p>
          </div>
          <button className="view-all-link" onClick={() => navigate('/shop/all')} id="view-all-categories-btn">
            View All →
          </button>
        </div>

        <div className="category-circles-grid">
          {categories.map(category => (
            <div 
              key={category.id} 
              className="category-circle-item"
              onClick={() => navigate(`/shop/${category.id}`)}
            >
              <div className="category-image-wrap">
                <img src={category.image} alt={category.name} className="category-circle-image" />
              </div>
              <span className="category-circle-name">{category.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Now */}
      <section className="trending-section container">
        <div className="trending-header">
          <h2 className="section-title">Trending Now</h2>
          <p className="section-subtitle">Our most sought-after pieces this week.</p>
        </div>

        {/* Tab Filters */}
        <div className="trending-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`trending-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              id={`tab-${tab.id}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {trendingProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
