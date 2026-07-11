import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { FiUser, FiShoppingBag, FiShield } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

const roles = [
  { id: 'customer', label: 'Customer', icon: <FiUser size={15} />, subtitle: 'Shop thousands of premium products', redirect: '/home' },
  { id: 'vendor',   label: 'Vendor',   icon: <FiShoppingBag size={15} />, subtitle: 'Manage your store and inventory', redirect: '/vendor/dashboard' },
  { id: 'admin',    label: 'Admin',    icon: <FiShield size={15} />, subtitle: 'Platform administration panel', redirect: '/admin/dashboard' },
];

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const activeRole = roles.find(r => r.id === selectedRole);

  function handleSubmit(e) {
    e.preventDefault();
    login(selectedRole);
    navigate(activeRole.redirect);
  }

  function handleSocialLogin() {
    login(selectedRole);
    navigate(activeRole.redirect);
  }

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Side - Image/Promo */}
        <div className="login-promo">
          <img
            src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&h=600&fit=crop"
            alt="Premium goods display"
            className="login-promo-bg-image"
          />
          <div className="login-promo-overlay"></div>
          <div className="login-promo-content">
            <h2 className="login-promo-logo">Simply Store</h2>
            <p className="login-promo-subtitle">Discover premium goods for your everyday life.</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="login-form-wrap">
          <div className="login-form-inner">
            <div className="login-header">
              <h1>Welcome Back</h1>
              <p>{activeRole.subtitle}</p>
            </div>

            {/* Role Selector */}
            <div className="login-role-selector">
              {roles.map(role => (
                <button
                  key={role.id}
                  type="button"
                  className={`login-role-btn ${selectedRole === role.id ? 'active' : ''}`}
                  onClick={() => setSelectedRole(role.id)}
                  id={`role-btn-${role.id}`}
                >
                  <span className="login-role-icon">{role.icon}</span>
                  <span>{role.label}</span>
                </button>
              ))}
            </div>

            {/* Social Logins */}
            <div className="social-logins">
              <button className="social-btn" onClick={handleSocialLogin}>
                <FcGoogle size={18} />
                <span>Google</span>
              </button>
              <button className="social-btn" onClick={handleSocialLogin}>
                <FaApple size={18} />
                <span>Apple</span>
              </button>
            </div>

            <div className="login-divider">
              <span>Or continue with</span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label className="form-label" htmlFor="email-input">Email Address</label>
                <input
                  id="email-input"
                  type="email"
                  placeholder="name@example.com"
                  className="form-input"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="password-input">Password</label>
                <input
                  id="password-input"
                  type="password"
                  placeholder="••••••••"
                  className="form-input"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="login-options">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" className="forgot-password">Forgot Password?</a>
              </div>

              <button type="submit" className="btn btn-primary btn-block" id="signin-submit-btn">
                Sign In as {activeRole.label}
              </button>
            </form>

            <p className="login-footer">
              Don't have an account? <a href="#signup">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
