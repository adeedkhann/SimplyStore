import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <Link to="/home" className="footer-logo">Simply Store</Link>

        <nav className="footer-nav">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/shipping">Shipping Info</Link>
          <Link to="/contact">Contact Us</Link>
        </nav>

        <p className="footer-copy">© 2024 Simply Store. All rights reserved.</p>
      </div>
    </footer>
  );
}
