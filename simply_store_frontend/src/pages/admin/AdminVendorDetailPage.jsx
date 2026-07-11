import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout';
import { vendors, vendorProducts } from '../../data/mockData';
import { FiChevronLeft, FiMapPin, FiMail, FiPhone, FiCalendar, FiAlertTriangle } from 'react-icons/fi';
import './AdminVendorDetailPage.css';

const logoColors = ['#4B3DE3','#0D9488','#F59E0B','#EF4444','#8B5CF6','#3B82F6','#EC4899','#10B981'];
const statusStyle = { active: { label:'Active', cls:'avd-badge-active' }, pending: { label:'Pending Approval', cls:'avd-badge-pending' }, suspended: { label:'Suspended', cls:'avd-badge-suspended' } };

export default function AdminVendorDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const vendorIndex = vendors.findIndex(v => v.id === id);
  const vendor = vendors[vendorIndex !== -1 ? vendorIndex : 0];
  const color = logoColors[vendorIndex !== -1 ? vendorIndex % logoColors.length : 0];
  const [status, setStatus] = useState(vendor.status);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <AdminLayout pageTitle="Vendor Detail">
      <div className="avd-page fade-in">
        <button className="back-btn" onClick={() => navigate('/admin/vendors')}>
          <FiChevronLeft size={16} /><span>Back to Vendors</span>
        </button>

        {/* Profile Card */}
        <div className="avd-profile-card">
          <div className="avd-profile-left">
            <div className="avd-big-logo" style={{ background: color }}>{vendor.logo}</div>
            <div className="avd-profile-info">
              <h1 className="avd-vendor-name">{vendor.name}</h1>
              <span className={`av-badge ${statusStyle[status].cls}`}>{statusStyle[status].label}</span>
              <div className="avd-meta-grid">
                <span className="avd-meta-item"><FiMail size={13} />{vendor.email}</span>
                <span className="avd-meta-item"><FiPhone size={13} />{vendor.phone}</span>
                <span className="avd-meta-item"><FiMapPin size={13} />{vendor.location}</span>
                <span className="avd-meta-item"><FiCalendar size={13} />Joined {vendor.joinDate}</span>
              </div>
            </div>
          </div>
          <div className="avd-action-btns">
            {status === 'pending' && <button className="btn btn-primary btn-sm" onClick={() => setStatus('active')}>Approve Vendor</button>}
            {status === 'active' && <button className="btn btn-secondary btn-sm" style={{ color: 'var(--clr-warning)', borderColor: 'var(--clr-warning)' }} onClick={() => setStatus('suspended')}>Suspend</button>}
            {status === 'suspended' && <button className="btn btn-secondary btn-sm" style={{ color: 'var(--clr-accent)' }} onClick={() => setStatus('active')}>Reactivate</button>}
            <button className="btn btn-secondary btn-sm avd-remove-btn" onClick={() => setShowConfirm(true)}>Remove Vendor</button>
          </div>
        </div>

        {showConfirm && (
          <div className="avd-confirm-banner fade-in">
            <FiAlertTriangle size={16} />
            <span>Are you sure you want to permanently remove <strong>{vendor.name}</strong>? This cannot be undone.</span>
            <button className="btn btn-sm" style={{ background: 'var(--clr-danger)', color: 'white' }} onClick={() => { setShowConfirm(false); navigate('/admin/vendors'); }}>Yes, Remove</button>
            <button className="btn btn-secondary btn-sm" onClick={() => setShowConfirm(false)}>Cancel</button>
          </div>
        )}

        {/* Stats + Products */}
        <div className="avd-mid-row">
          <div className="avd-card avd-stats-card">
            <h3 className="avd-card-title">Store Stats</h3>
            <div className="avd-stats-list">
              <div className="avd-stat-row"><span>Total Revenue</span><strong>${vendor.revenue.toLocaleString()}</strong></div>
              <div className="avd-stat-row"><span>Products Listed</span><strong>{vendor.products}</strong></div>
              <div className="avd-stat-row"><span>Category</span><strong>{vendor.category}</strong></div>
              <div className="avd-stat-row"><span>Account Status</span><strong style={{ color: status === 'active' ? 'var(--clr-admin)' : 'var(--clr-danger)' }}>{statusStyle[status].label}</strong></div>
            </div>
          </div>

          <div className="avd-card">
            <h3 className="avd-card-title">Product Listings</h3>
            <table className="av-table">
              <thead><tr><th>Product</th><th>SKU</th><th>Price</th><th>Stock</th></tr></thead>
              <tbody>
                {vendorProducts.slice(0, 5).map(p => (
                  <tr key={p.id}>
                    <td><div style={{ display:'flex', alignItems:'center', gap:8 }}><img src={p.image} style={{ width:32, height:32, borderRadius:6, objectFit:'cover' }} alt="" />{p.name}</div></td>
                    <td><code className="vd-sku">{p.sku}</code></td>
                    <td>${p.price}</td>
                    <td>{p.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
