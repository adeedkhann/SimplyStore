import { useState } from 'react';
import VendorLayout from '../../layouts/VendorLayout';
import { FiUpload } from 'react-icons/fi';
import './VendorSettingsPage.css';

const tabs = ['Store Profile', 'Bank Details', 'Notifications'];

const notifItems = [
  { id: 'new-order', label: 'New Order Alert', desc: 'Get notified when a new order is placed' },
  { id: 'return-req', label: 'Return Request', desc: 'Alert when a customer files a return or replace' },
  { id: 'payout', label: 'Payout Processed', desc: 'Confirmation when a payout is completed' },
  { id: 'weekly', label: 'Weekly Report', desc: 'Summary of weekly sales and analytics' },
  { id: 'promo', label: 'Promotional Emails', desc: 'Platform promotions and feature announcements' },
];

export default function VendorSettingsPage() {
  const [activeTab, setActiveTab] = useState('Store Profile');
  const [logoPreview, setLogoPreview] = useState(null);
  const [saved, setSaved] = useState(false);
  const [toggles, setToggles] = useState({ 'new-order': true, 'return-req': true, payout: true, weekly: false, promo: false });
  const [storeForm, setStoreForm] = useState({ name: 'TechVision Co.', desc: 'Premium electronics and workspace accessories.', category: 'Electronics', email: 'contact@techvision.com' });
  const [bankForm, setBankForm] = useState({ holder: 'Arjun Mehta', bank: 'Bank of America', account: '****4521', ifsc: 'BOFA0001234' });

  function handleSave(e) { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 3000); }
  function handleLogoUpload(e) { const f = e.target.files[0]; if (f) setLogoPreview(URL.createObjectURL(f)); }

  return (
    <VendorLayout pageTitle="Settings">
      <div className="vsp-page fade-in">
        <div className="vsp-tabs">
          {tabs.map(t => (
            <button key={t} className={`vsp-tab-btn ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>{t}</button>
          ))}
        </div>

        {saved && <div className="vsp-saved-banner fade-in">✓ Settings saved successfully!</div>}

        {activeTab === 'Store Profile' && (
          <div className="vsp-card fade-in">
            <h2 className="vsp-card-title">Store Profile</h2>
            <form onSubmit={handleSave} className="vsp-form">
              <div className="vsp-logo-row">
                <div className="vsp-logo-circle" onClick={() => document.getElementById('logo-upload').click()}>
                  {logoPreview ? <img src={logoPreview} alt="logo" className="vsp-logo-img" /> : <span className="vsp-logo-initials">TV</span>}
                  <div className="vsp-logo-overlay"><FiUpload size={16} /></div>
                </div>
                <input id="logo-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleLogoUpload} />
                <div>
                  <p className="vsp-logo-hint">Click the circle to upload your store logo</p>
                  <p className="vsp-logo-sub">PNG or JPG, max 2MB</p>
                </div>
              </div>
              <div className="vsp-form-grid">
                <div className="form-group">
                  <label className="form-label">Store Name</label>
                  <input className="form-input" value={storeForm.name} onChange={e => setStoreForm({ ...storeForm, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-input" value={storeForm.category} onChange={e => setStoreForm({ ...storeForm, category: e.target.value })}>
                    {['Electronics','Clothing','Home & Living','Dining','Wellness','Workspace','Textiles'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group vsp-full">
                  <label className="form-label">Store Description</label>
                  <textarea className="form-input" rows={3} value={storeForm.desc} onChange={e => setStoreForm({ ...storeForm, desc: e.target.value })} />
                </div>
                <div className="form-group vsp-full">
                  <label className="form-label">Contact Email</label>
                  <input type="email" className="form-input" value={storeForm.email} onChange={e => setStoreForm({ ...storeForm, email: e.target.value })} />
                </div>
              </div>
              <button type="submit" className="btn btn-primary" id="save-store-profile-btn">Save Changes</button>
            </form>
          </div>
        )}

        {activeTab === 'Bank Details' && (
          <div className="vsp-card fade-in">
            <h2 className="vsp-card-title">Bank Details</h2>
            <form onSubmit={handleSave} className="vsp-form">
              <div className="vsp-form-grid">
                <div className="form-group">
                  <label className="form-label">Account Holder Name</label>
                  <input className="form-input" value={bankForm.holder} onChange={e => setBankForm({ ...bankForm, holder: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Bank Name</label>
                  <input className="form-input" value={bankForm.bank} onChange={e => setBankForm({ ...bankForm, bank: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Account Number</label>
                  <input className="form-input" value={bankForm.account} readOnly style={{ color: 'var(--clr-text-muted)' }} />
                </div>
                <div className="form-group">
                  <label className="form-label">IFSC / SWIFT Code</label>
                  <input className="form-input" value={bankForm.ifsc} onChange={e => setBankForm({ ...bankForm, ifsc: e.target.value })} />
                </div>
              </div>
              <button type="submit" className="btn btn-primary" id="save-bank-details-btn">Save Bank Details</button>
            </form>
          </div>
        )}

        {activeTab === 'Notifications' && (
          <div className="vsp-card fade-in">
            <h2 className="vsp-card-title">Notification Preferences</h2>
            <div className="vsp-notif-list">
              {notifItems.map(item => (
                <div key={item.id} className="vsp-notif-row">
                  <div className="vsp-notif-info">
                    <span className="vsp-notif-label">{item.label}</span>
                    <span className="vsp-notif-desc">{item.desc}</span>
                  </div>
                  <label className="vsp-toggle" htmlFor={`toggle-${item.id}`}>
                    <input
                      id={`toggle-${item.id}`}
                      type="checkbox"
                      checked={toggles[item.id]}
                      onChange={() => setToggles(t => ({ ...t, [item.id]: !t[item.id] }))}
                    />
                    <span className="vsp-toggle-track"><span className="vsp-toggle-thumb" /></span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </VendorLayout>
  );
}
