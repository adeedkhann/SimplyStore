import { useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import './InfoPage.css';

export default function InfoPage() {
  const location = useLocation();
  const path = location.pathname;

  const [contactForm, setContactForm] = useState({
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  function handleContactSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setContactForm(prev => ({ ...prev, message: '' }));
    }, 3000);
  }

  function renderContent() {
    const backButton = (
      <Link to="/home" className="info-back-link">
        ← Back to Home
      </Link>
    );

    if (path === '/privacy') {
      return (
        <div className="info-content-card fade-in">
          {backButton}
          <h1 className="info-title" style={{ marginTop: 12 }}>Privacy Policy</h1>
          <p className="info-updated">Last updated: October 2024</p>
          <div className="info-body">
            <p>At Simply Store, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information.</p>
            <h3>Information Collection</h3>
            <p>We collect information you provide directly, such as when creating an account, making a purchase, or contacting support. This includes name, email, shipping address, and payment token references.</p>
            <h3>Use of Information</h3>
            <p>We use your information to process orders, manage deliveries, personalize customer support, and send system updates or promotions (which you can opt out of at any time).</p>
            <h3>Security</h3>
            <p>We implement state-of-the-art encryption protocols to safeguard your personal profile and checkout transactions.</p>
          </div>
        </div>
      );
    }

    if (path === '/terms') {
      return (
        <div className="info-content-card fade-in">
          {backButton}
          <h1 className="info-title" style={{ marginTop: 12 }}>Terms of Service</h1>
          <p className="info-updated">Last updated: October 2024</p>
          <div className="info-body">
            <p>Welcome to Simply Store. By using our website, catalog features, or making a purchase, you agree to comply with and be bound by the following terms.</p>
            <h3>User Accounts</h3>
            <p>You are responsible for maintaining account details confidentiality and all activities occurring under your credentials.</p>
            <h3>Purchases & Pricing</h3>
            <p>All listings prices are subject to change. We reserve the right to cancel orders arising from typographical pricing errors.</p>
            <h3>Intellectual Property</h3>
            <p>All content, logo styles, photographs, and layouts are the exclusive property of Simply Store.</p>
          </div>
        </div>
      );
    }

    if (path === '/shipping') {
      return (
        <div className="info-content-card fade-in">
          {backButton}
          <h1 className="info-title" style={{ marginTop: 12 }}>Shipping & Returns</h1>
          <p className="info-updated">Fast, reliable, and premium delivery.</p>
          <div className="info-body">
            <h3>Standard Delivery</h3>
            <p>Free standard shipping is applied on all orders totaling $150.00 or more. For smaller orders, a flat fee of $9.99 is charged.</p>
            <h3>Delivery Times</h3>
            <p>Orders are dispatched within 24 hours of placement. Standard transit takes 2-4 business days.</p>
            <h3>Return Policy</h3>
            <p>We offer free returns and replacements within 30 days of item receipt. Items must be in their original packaging and unused condition.</p>
          </div>
        </div>
      );
    }

    if (path === '/contact') {
      return (
        <div className="info-content-card fade-in">
          {backButton}
          <h1 className="info-title" style={{ marginTop: 12 }}>Contact Us</h1>
          <p className="info-subtitle">Have questions or feedback? Drop us a line below.</p>
          
          {submitted ? (
            <div className="contact-success-banner fade-in">
              <span className="success-icon">✓</span>
              <div>
                <h4>Message Sent!</h4>
                <p>Thank you for reaching out. We will get back to you shortly.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="contact-form-layout">
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Your Name</label>
                <input 
                  id="contact-name"
                  type="text" 
                  className="form-input" 
                  value={contactForm.name}
                  onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">Email Address</label>
                <input 
                  id="contact-email"
                  type="email" 
                  className="form-input" 
                  value={contactForm.email}
                  onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-msg">Message</label>
                <textarea 
                  id="contact-msg"
                  className="form-input text-area-input" 
                  placeholder="How can we help you?"
                  value={contactForm.message}
                  onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                  rows={5}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" id="contact-submit-btn">Send Message</button>
            </form>
          )}
        </div>
      );
    }

    return (
      <div className="info-content-card text-center fade-in">
        <h1>Page Not Found</h1>
        <Link to="/home" className="btn btn-primary" style={{ marginTop: 16 }}>Back Home</Link>
      </div>
    );
  }

  return (
    <div className="info-page container page-content">
      {renderContent()}
    </div>
  );
}
