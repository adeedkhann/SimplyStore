import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiGrid, FiBox, FiShoppingBag, FiDollarSign, FiSettings, FiMenu, FiX, FiBell, FiLogOut, FiChevronRight } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import './VendorLayout.css';

const navItems = [
  { to: '/vendor/dashboard', icon: <FiGrid size={18} />, label: 'Dashboard' },
  { to: '/vendor/products', icon: <FiBox size={18} />, label: 'Products' },
  { to: '/vendor/orders', icon: <FiShoppingBag size={18} />, label: 'Orders' },
  { to: '/vendor/payouts', icon: <FiDollarSign size={18} />, label: 'Payouts' },
  { to: '/vendor/settings', icon: <FiSettings size={18} />, label: 'Settings' },
];

export default function VendorLayout({ children, pageTitle }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  const initials = auth?.user?.name
    ? auth.user.name.split(' ').map(w => w[0]).join('').slice(0, 2)
    : 'VC';

  return (
    <div className="vendor-shell">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="vendor-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`vendor-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="vendor-sidebar-header">
          <div className="vendor-brand">
            <span className="vendor-brand-name">Simply Store</span>
            <span className="vendor-brand-sub">Vendor Portal</span>
          </div>
          <button className="vendor-sidebar-close" onClick={() => setSidebarOpen(false)}>
            <FiX size={18} />
          </button>
        </div>

        <nav className="vendor-nav">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `vendor-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="vendor-nav-icon">{item.icon}</span>
              <span className="vendor-nav-label">{item.label}</span>
              <FiChevronRight size={14} className="vendor-nav-arrow" />
            </NavLink>
          ))}
        </nav>

        <div className="vendor-sidebar-footer">
          <div className="vendor-user-row">
            <div className="vendor-avatar">{initials}</div>
            <div className="vendor-user-info">
              <span className="vendor-user-name">{auth?.user?.name || 'TechVision Co.'}</span>
              <span className="vendor-user-role">Vendor Account</span>
            </div>
          </div>
          <button className="vendor-logout-btn" onClick={handleLogout}>
            <FiLogOut size={15} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="vendor-main">
        {/* Top bar */}
        <header className="vendor-topbar">
          <div className="vendor-topbar-left">
            <button className="vendor-menu-btn" onClick={() => setSidebarOpen(true)}>
              <FiMenu size={20} />
            </button>
            <h1 className="vendor-page-title">{pageTitle || 'Dashboard'}</h1>
          </div>
          <div className="vendor-topbar-right">
            <button className="vendor-icon-btn" title="Notifications">
              <FiBell size={18} />
              <span className="vendor-notif-dot" />
            </button>
            <div className="vendor-avatar vendor-topbar-avatar">{initials}</div>
          </div>
        </header>

        {/* Page content */}
        <main className="vendor-content">
          {children}
        </main>
      </div>
    </div>
  );
}
