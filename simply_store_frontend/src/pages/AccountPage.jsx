import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiLock, FiMapPin, FiCreditCard, FiPackage, FiEdit2, FiCheckCircle, FiChevronLeft } from 'react-icons/fi';
import './AccountPage.css';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('personal-info');
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 123-4567'
  });

  const sidebarItems = [
    { id: 'personal-info', label: 'Personal Info', icon: <FiUser size={16} /> },
    { id: 'security', label: 'Security', icon: <FiLock size={16} /> },
    { id: 'addresses', label: 'Addresses', icon: <FiMapPin size={16} /> },
    { id: 'payments', label: 'Payments', icon: <FiCreditCard size={16} /> },
    { id: 'orders', label: 'Orders', icon: <FiPackage size={16} /> },
  ];

  function handleTabClick(id) {
    if (id === 'orders') {
      navigate('/orders');
    } else {
      setActiveTab(id);
    }
  }

  function handleFormSave(e) {
    e.preventDefault();
    alert('Changes saved successfully!');
  }

  return (
    <div className="account-page container page-content fade-in">
      {/* Back to Home redirection */}
      <button className="back-btn" onClick={() => navigate('/home')} style={{ marginBottom: 20 }}>
        <FiChevronLeft size={16} />
        <span>Back to Home</span>
      </button>

      {/* Profile Header Block */}
      <div className="profile-header-card">
        <div className="profile-header-left">
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop" 
            alt="Jane Doe" 
            className="profile-avatar" 
          />
          <div className="profile-info-block">
            <h2 className="profile-name">Jane Doe</h2>
            <p className="profile-join-date">🗓️ Joined March 2022</p>
            <div className="profile-badges">
              <span className="badge badge-verified">Verified Buyer</span>
              <span className="badge badge-premium">Premium Member</span>
            </div>
          </div>
        </div>

        <button className="btn btn-secondary edit-profile-btn" onClick={() => alert('Edit profile details')}>
          <FiEdit2 size={14} />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* Main split */}
      <div className="account-split-layout">
        {/* Sidebar navigation */}
        <aside className="account-sidebar-nav">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              className={`account-nav-btn ${activeTab === item.id || (item.id === 'orders' && window.location.pathname === '/orders') ? 'active' : ''}`}
              onClick={() => handleTabClick(item.id)}
              id={`account-tab-${item.id}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </aside>

        {/* Content detail panels */}
        <main className="account-content-detail">
          {activeTab === 'personal-info' && (
            <div className="personal-info-panel fade-in">
              <h3 className="panel-title">Personal Information</h3>
              
              <form onSubmit={handleFormSave} className="personal-info-form">
                <div className="form-row-split">
                  <div className="form-group">
                    <label className="form-label" htmlFor="first-name-input">First Name</label>
                    <input 
                      id="first-name-input"
                      type="text" 
                      className="form-input" 
                      value={form.firstName}
                      onChange={e => setForm({ ...form, firstName: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="last-name-input">Last Name</label>
                    <input 
                      id="last-name-input"
                      type="text" 
                      className="form-input" 
                      value={form.lastName}
                      onChange={e => setForm({ ...form, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group relative-wrap">
                  <label className="form-label" htmlFor="email-input">Email Address</label>
                  <input 
                    id="email-input"
                    type="email" 
                    className="form-input verified-input" 
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                  <FiCheckCircle className="input-check-icon" size={16} />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone-input">Phone Number</label>
                  <input 
                    id="phone-input"
                    type="text" 
                    className="form-input" 
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary save-form-btn" id="save-account-details-btn">Save Changes</button>
              </form>

              {/* Saved Addresses Section */}
              <div className="divider"></div>
              
              <div className="addresses-header-row">
                <h3 className="panel-title">Saved Addresses</h3>
                <button className="add-address-link" onClick={() => alert('Add Address popup')}>+ Add New</button>
              </div>

              <div className="saved-addresses-grid">
                <div className="address-card default">
                  <div className="address-card-header">
                    <span className="address-name-lbl">Home</span>
                    <span className="badge address-badge">DEFAULT</span>
                  </div>
                  <p className="address-details-text">
                    Jane Doe<br />
                    123 Innovation Drive<br />
                    Apt 4B<br />
                    San Francisco, CA 94105<br />
                    United States
                  </p>
                </div>

                <div className="address-card">
                  <div className="address-card-header">
                    <span className="address-name-lbl">Office</span>
                  </div>
                  <p className="address-details-text">
                    Jane Doe<br />
                    987 Startup Blvd<br />
                    Floor 12<br />
                    San Francisco, CA 94107<br />
                    United States
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="personal-info-panel fade-in">
              <h3 className="panel-title">Security & Password</h3>
              <p className="text-secondary text-sm">Update your password and login credentials to keep your profile secure.</p>
              <div className="form-group" style={{ marginTop: 16 }}>
                <button className="btn btn-secondary" onClick={() => alert('Change password email sent!')}>Request Password Reset</button>
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="personal-info-panel fade-in">
              <h3 className="panel-title">Manage Saved Addresses</h3>
              <p className="text-secondary text-sm">View, edit, or delete shipping destinations from your profile database.</p>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="personal-info-panel fade-in">
              <h3 className="panel-title">Saved Payment Methods</h3>
              <p className="text-secondary text-sm">Review credit cards and wallets linked to your checkout.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
