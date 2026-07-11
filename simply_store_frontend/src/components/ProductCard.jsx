import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import './ProductCard.css';

function StarRating({ rating, reviews }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push(<FaStar key={i} className="star" />);
    else if (rating >= i - 0.5) stars.push(<FaStarHalfAlt key={i} className="star" />);
    else stars.push(<FaRegStar key={i} className="star star-empty" />);
  }
  return (
    <div className="product-rating">
      <div className="stars">{stars}</div>
      {reviews && <span className="product-reviews">({reviews})</span>}
    </div>
  );
}

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();
  const wishlisted = isWishlisted(product.id);

  function handleAddToCart(e) {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  function handleWishlist(e) {
    e.stopPropagation();
    toggleWishlist(product.id);
  }

  function handleQuickView(e) {
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  }

  function getBadgeClass(badge) {
    if (!badge) return '';
    const map = {
      'NEW': 'badge-new',
      'SALE': 'badge-sale',
      'BEST SELLER': 'badge-bestseller',
      'LOW STOCK': 'badge-lowstock',
    };
    return map[badge] || 'badge-new';
  }

  return (
    <div className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
      <div className="product-image-wrap">
        <img src={product.image} alt={product.name} className="product-image" loading="lazy" />

        {product.badge && (
          <span className={`badge product-badge ${getBadgeClass(product.badge)}`}>
            {product.badge}
          </span>
        )}

        <button
          className={`product-wishlist-btn ${wishlisted ? 'wishlisted' : ''}`}
          onClick={handleWishlist}
          title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          id={`wishlist-${product.id}`}
        >
          <FiHeart size={16} />
        </button>

        <div className="product-quick-view" onClick={handleQuickView}>
          Quick View
        </div>
      </div>

      <div className="product-info">
        <p className="product-brand">{product.brand}</p>
        <h3 className="product-name">{product.name}</h3>
        <StarRating rating={product.rating} reviews={product.reviews} />

        <div className="product-footer">
          <div className="product-price-wrap">
            <span className="product-price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="product-original-price">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          <button
            className={`btn btn-sm product-add-btn ${added ? 'added' : ''}`}
            onClick={handleAddToCart}
            disabled={!product.inStock}
            id={`add-to-cart-${product.id}`}
          >
            {!product.inStock ? 'Out of Stock' : added ? '✓ Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
