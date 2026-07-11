import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { FiHeart, FiShoppingCart, FiChevronLeft, FiCheck } from 'react-icons/fi';
import { useState } from 'react';
import './ProductDetailPage.css';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const [added, setAdded] = useState(false);

  const product = products.find(p => p.id === Number(id));
  const wishlisted = isWishlisted(product?.id);

  if (!product) {
    return (
      <div className="container page-content text-center" style={{ padding: '80px 0' }}>
        <h2>Product not found</h2>
        <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate('/shop/all')}>Back to shop</button>
      </div>
    );
  }

  function handleAddToCart() {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="product-detail-page container page-content fade-in">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FiChevronLeft size={16} />
        <span>Back</span>
      </button>

      <div className="product-detail-layout">
        {/* Left Image */}
        <div className="detail-img-wrap">
          <img src={product.image} alt={product.name} className="detail-img" />
          {product.badge && <span className="badge detail-badge">{product.badge}</span>}
        </div>

        {/* Right Info */}
        <div className="detail-info-wrap">
          <div>
            <span className="detail-brand">{product.brand}</span>
            <h1 className="detail-title">{product.name}</h1>
            <p className="detail-desc">{product.description}</p>
          </div>

          <div className="detail-purchase-section">
            <div className="detail-price-row">
              <span className="detail-price">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="detail-orig-price">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            <div className="detail-actions-row">
              <button 
                className={`btn btn-primary detail-add-btn ${added ? 'success' : ''}`}
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {added ? (
                  <>
                    <FiCheck size={16} />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <FiShoppingCart size={16} />
                    <span>{!product.inStock ? 'Out of Stock' : 'Add to Cart'}</span>
                  </>
                )}
              </button>

              <button 
                className={`wishlist-btn-icon ${wishlisted ? 'active' : ''}`}
                onClick={() => toggleWishlist(product.id)}
                title="Wishlist"
              >
                <FiHeart size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
