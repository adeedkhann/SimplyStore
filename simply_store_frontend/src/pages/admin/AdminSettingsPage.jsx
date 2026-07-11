import { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import './AdminSettingsPage.css';

const tabs = ['Platform', 'Commission', 'Features'];

const categories = [
  { name: 'Electronics', rate: 14 }, { name: 'Clothing', rate: 12 },
  { name: 'Home & Living', rate: 10 }, { name: 'Dining', rate: 11 },
  { name: 'Wellness', rate: 13 }, { name: 'Workspace', rate: 12 },
];

const featureItems = [
  { id: 'vendor-reviews', label: 'Vendor Reviews', desc: 'Allow customers to review vendor stores' },
  { id: 'customer-reviews', label: 'Customer Reviews', desc: 'Allow customers to leave product reviews' },
  { id: 'flash-sales', label: 'Flash Sales', desc: 'Enable time-limited flash sale events on the platform' },
  { id: 'gift-cards', label: 'Gift Cards', desc: 'Allow customers to purchase and redeem gift cards' },
  { id: 'multi-currency', label: 'Multi-Currency', desc: 'Display prices in the customer\'s local currency' },
  { id: 'referral', label: 'Referral Program', desc: 'Reward customers for referring new users' },
];

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('Platform');
  const [saved, setSaved] = useState(false);
  const [commission, setCommission] = useState(12);
  const [features, setFeatures] = useState({ 'vendor-reviews': true, 'customer-reviews': true, 'flash-sales': false, 'gift-cards': false, 'multi-currency': true, 'referral': false });
  const [platform, setPlatform] = useState({ name: 'Simply Store', email: 'support@simplystore.com', phone: '+1 800 555 0100' });

  function handleSave(e) { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 3000); }
  const toggleFeature = id => setFeatures(f => ({ ...f, [id]: !f[id] }));

  return (
    <AdminLayout pageTitle="Platform Settings">
      <div className="asp-page fade-in">
        <div className="vsp-tabs">
          {tabs.map(t => <button key={t} className={`vsp-tab-btn ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>{t}</button>)}
        </div>
        {saved && <div className="vsp-saved-banner fade-in">✓ Settings saved successfully!</div>}

        {activeTab === 'Platform' && (
          <div className="vsp-card fade-in">
            <h2 className="vsp-card-title">Platform Settings</h2>
            <form onSubmit={handleSave} className="vsp-form">
              <div className="vsp-form-grid">
                <div className="form-group"><label className="form-label">Platform Name</label><input className="form-input" value={platform.name} onChange={e => setPlatform({ ...platform, name: e.target.value })} /></div>
                <div className="form-group"><label className="form-label">Support Email</label><input type="email" className="form-input" value={platform.email} onChange={e => setPlatform({ ...platform, email: e.target.value })} /></div>
                <div className="form-group"><label className="form-label">Support Phone</label><input className="form-input" value={platform.phone} onChange={e => setPlatform({ ...platform, phone: e.target.value })} /></div>
              </div>
              <button type="submit" className="btn btn-primary" id="save-platform-btn">Save Platform Settings</button>
            </form>
          </div>
        )}

        {activeTab === 'Commission' && (
          <div className="vsp-card fade-in">
            <h2 className="vsp-card-title">Commission Rates</h2>
            <div className="asp-commission-section">
              <div className="asp-commission-header">
                <div className="asp-commission-info">
                  <label className="form-label">Global Commission Rate</label>
                  <p className="asp-commission-desc">Platform earns <strong>{commission}%</strong> on every vendor sale platform-wide.</p>
                </div>
                <div className="asp-commission-value">{commission}%</div>
              </div>
              <input type="range" min={0} max={30} value={commission} onChange={e => setCommission(Number(e.target.value))} className="asp-slider" />
              <div className="asp-slider-labels"><span>0%</span><span>15%</span><span>30%</span></div>
            </div>
            <h3 className="asp-section-title">Per-Category Overrides</h3>
            <table className="av-table">
              <thead><tr><th>Category</th><th>Rate</th><th>Action</th></tr></thead>
              <tbody>
                {categories.map((cat, i) => (
                  <tr key={cat.name}>
                    <td>{cat.name}</td>
                    <td><strong>{cat.rate}%</strong></td>
                    <td><button className="av-btn av-btn-view" style={{ padding: '4px 10px' }}>Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btn btn-primary" onClick={handleSave} id="save-commission-btn">Save Commission Settings</button>
          </div>
        )}

        {activeTab === 'Features' && (
          <div className="vsp-card fade-in">
            <h2 className="vsp-card-title">Platform Features</h2>
            <div className="vsp-notif-list">
              {featureItems.map(f => (
                <div key={f.id} className="vsp-notif-row">
                  <div className="vsp-notif-info">
                    <span className="vsp-notif-label">{f.label}</span>
                    <span className="vsp-notif-desc">{f.desc}</span>
                  </div>
                  <label className="vsp-toggle" htmlFor={`feat-${f.id}`}>
                    <input id={`feat-${f.id}`} type="checkbox" checked={features[f.id]} onChange={() => toggleFeature(f.id)} />
                    <span className="vsp-toggle-track"><span className="vsp-toggle-thumb" /></span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
