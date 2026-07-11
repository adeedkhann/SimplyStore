import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiGrid, FiUsers, FiUser, FiPackage, FiCornerUpLeft, FiSettings, FiMenu, FiX, FiBell, FiSearch, FiLogOut, FiChevronRight } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import './AdminLayout.css';

const navItems = [
  { to: '/admin/dashboard', icon: <FiGrid size={18} />, label: 'Dashboard' },
  { to: '/admin/vendors', icon: <FiUsers size={18} />, label: 'Vendors' },
  { to: '/admin/customers', icon: <FiUser size={18} />, label: 'Customers' },
  { to: '/admin/returns', icon: <FiCornerUpLeft size={18} />, label: 'Returns' },
  { to: '/admin/settings', icon: <FiSettings size={18} />, label: 'Settings' },
];

export default function AdminLayout({ children, pageTitle }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() { logout(); navigate('/login'); }
  const initials = auth?.user?.name ? auth.user.name.split(' ').map(w => w[0]).join('').slice(0, 2) : 'SA';

  return (
    <div className="admin-shell">
      {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />}

      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <div className="admin-brand">
            <span className="admin-brand-name">Simply Store</span>
            <span className="admin-brand-sub">Admin Panel</span>
          </div>
          <button className="admin-sidebar-close" onClick={() => setSidebarOpen(false)}><FiX size={18} /></button>
        </div>

        <nav className="admin-nav">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="admin-nav-icon">{item.icon}</span>
              <span className="admin-nav-label">{item.label}</span>
              <FiChevronRight size={14} className="admin-nav-arrow" />
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-row">
            <div className="admin-avatar">{initials}</div>
            <div className="admin-user-info">
              <span className="admin-user-name">{auth?.user?.name || 'Platform Admin'}</span>
              <span className="admin-user-role">Administrator</span>
            </div>
          </div>
          <button className="admin-logout-btn" onClick={handleLogout}><FiLogOut size={15} /><span>Logout</span></button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button className="admin-menu-btn" onClick={() => setSidebarOpen(true)}><FiMenu size={20} /></button>
            <h1 className="admin-page-title">{pageTitle || 'Dashboard'}</h1>
          </div>
          <div className="admin-topbar-right">
            <button className="admin-icon-btn" title="Search"><FiSearch size={18} /></button>
            <button className="admin-icon-btn" title="Notifications"><FiBell size={18} /><span className="admin-notif-dot" /></button>
            <div className="admin-avatar admin-topbar-avatar">{initials}</div>
          </div>
        </header>
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
