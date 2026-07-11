import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiMinus, FiPlus, FiTrash2, FiBookmark, FiLock } from 'react-icons/fi';
import './CartPage.css';

export default function CartPage() {
  const {
    cart, subtotal, shipping, tax, total,
    amountForFreeShipping, updateQty, removeFromCart
  } = useCart();
  const navigate = useNavigate();

  const pct = Math.min(100, (subtotal / 150) * 100);

  return (
    <div className="cart-page container page-content fade-in">
      <h1 className="cart-title">Shopping Cart</h1>
      <p className="cart-subtitle">{cart.length} items in your cart.</p>

      {cart.length > 0 ? (
        <div className="cart-layout">
          {/* Cart Items List */}
          <div className="cart-items-column">
            {/* Free Shipping Banner */}
            <div className="shipping-banner">
              <div className="shipping-banner-header">
                {amountForFreeShipping > 0 ? (
                  <span>You're <strong>${amountForFreeShipping.toFixed(2)}</strong> away from free shipping!</span>
                ) : (
                  <span className="text-primary font-bold">🎉 Congratulations! You qualify for Free Shipping.</span>
                )}
                <span className="shipping-banner-icon">🚚</span>
              </div>
              <div className="shipping-progress-track">
                <div 
                  className="shipping-progress-bar" 
                  style={{ width: `${pct}%` }}
                ></div>
              </div>
            </div>

            {/* Items List */}
            <div className="cart-items-list">
              {cart.map(item => (
                <div key={item.id} className="cart-item-card">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  
                  <div className="cart-item-details">
                    <div>
                      <p className="cart-item-brand">{item.brand}</p>
                      <h3 className="cart-item-name">{item.name}</h3>
                      <p className="cart-item-meta">
                        {item.color && <span>Color: {item.color}</span>}
                        {item.size && <span>Size: {item.size}</span>}
                      </p>
                    </div>

                    <div className="cart-item-actions">
                      <button className="cart-action-btn">
                        <FiBookmark size={14} />
                        <span>Save</span>
                      </button>
                      <button 
                        className="cart-action-btn remove"
                        onClick={() => removeFromCart(item.id)}
                        id={`remove-item-${item.id}`}
                      >
                        <FiTrash2 size={14} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-price-qty">
                    <span className="cart-item-price">${(item.price * item.qty).toFixed(2)}</span>
                    <div className="qty-controls">
                      <button 
                        className="qty-btn"
                        onClick={() => updateQty(item.id, -1)}
                        disabled={item.qty <= 1}
                        id={`qty-minus-${item.id}`}
                      >
                        <FiMinus size={12} />
                      </button>
                      <span className="qty-val">{item.qty}</span>
                      <button 
                        className="qty-btn"
                        onClick={() => updateQty(item.id, 1)}
                        id={`qty-plus-${item.id}`}
                      >
                        <FiPlus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="order-summary-column">
            <div className="summary-card">
              <h3 className="summary-title">Order Summary</h3>

              <div className="summary-rows">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="summary-row">
                  <span>Estimated Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="divider"></div>
                <div className="summary-row total-row">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="promo-code-wrap">
                <input 
                  type="text" 
                  placeholder="Promo code" 
                  className="form-input promo-input"
                  defaultValue="SIMPLY20"
                />
                <button className="btn btn-secondary promo-apply-btn">Apply</button>
              </div>

              <button 
                className="btn btn-primary btn-block summary-checkout-btn"
                onClick={() => navigate('/orders')}
                id="checkout-btn"
              >
                <span>Proceed to Checkout</span>
                <FiLock size={14} style={{ marginLeft: 6 }} />
              </button>

              <p className="secure-checkout-text">
                <FiLock size={12} style={{ marginRight: 4 }} />
                <span>Secure Checkout</span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Explore our items and find premium everyday essentials.</p>
          <Link to="/shop/all" className="btn btn-primary">Start Shopping</Link>
        </div>
      )}
    </div>
  );
}
