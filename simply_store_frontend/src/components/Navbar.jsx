import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import {
  FiSearch, FiHeart, FiShoppingCart, FiUser,
  FiChevronDown, FiX, FiMenu
} from 'react-icons/fi';
import './Navbar.css';

export default function Navbar() {
  const { totalItems, isWishlisted, wishlist } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const navLinks = [
    { label: 'Shop All', path: '/shop/all' },
    { label: 'Collections', path: '/shop/collections' },
    { label: 'New Arrivals', path: '/shop/new-arrivals' },
    { label: 'Sustainability', path: '/shop/sustainability' },
  ];

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  function handleSearch(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop/all?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  }

  const isActive = (path) => location.pathname === path || (path !== '/shop/all' && location.pathname.startsWith(path));

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/home" className="navbar-logo">
          Simply Store
        </Link>

        {/* Nav Links */}
        <ul className={`navbar-links ${mobileMenuOpen ? 'open' : ''}`}>
          {navLinks.map(link => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`navbar-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Icons */}
        <div className="navbar-actions">
          {searchOpen ? (
            <form className="navbar-search-form" onSubmit={handleSearch}>
              <input
                ref={searchRef}
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="navbar-search-input"
              />
              <button type="button" className="navbar-icon-btn" onClick={() => setSearchOpen(false)}>
                <FiX size={18} />
              </button>
            </form>
          ) : (
            <button className="navbar-icon-btn" onClick={() => setSearchOpen(true)} title="Search" id="search-btn">
              <FiSearch size={18} />
            </button>
          )}

          <Link to="/wishlist" className="navbar-icon-btn" title="Wishlist" id="wishlist-btn">
            <FiHeart size={18} />
            {wishlist.length > 0 && (
              <span className="navbar-badge wishlist-badge">{wishlist.length}</span>
            )}
          </Link>

          <Link to="/cart" className="navbar-icon-btn" title="Cart" id="cart-btn">
            <FiShoppingCart size={18} />
            {totalItems > 0 && (
              <span className="navbar-badge cart-badge">{totalItems}</span>
            )}
          </Link>

          <Link to="/account" className="navbar-icon-btn" title="Account" id="account-btn">
            <FiUser size={18} />
          </Link>

          <button
            className="navbar-mobile-toggle"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
