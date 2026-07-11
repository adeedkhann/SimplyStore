import { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { returnRequests } from '../../data/mockData';
import { FiChevronDown, FiChevronUp, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import './AdminReturnsPage.css';

const tabs = ['pending', 'approved', 'rejected'];
const tabLabels = { pending: 'Pending', approved: 'Approved', rejected: 'Rejected' };

export default function AdminReturnsPage() {
  const [activeTab, setActiveTab] = useState('pending');
  const [expandedId, setExpandedId] = useState(null);
  const [statusOverrides, setStatusOverrides] = useState({});
  const [notes, setNotes] = useState({});

  const getStatus = r => statusOverrides[r.id] || r.status;
  const filtered = returnRequests.filter(r => getStatus(r) === activeTab);

  function approve(id, type) { setStatusOverrides(s => ({ ...s, [id]: 'approved' })); setExpandedId(null); }
  function reject(id) { setStatusOverrides(s => ({ ...s, [id]: 'rejected' })); setExpandedId(null); }

  return (
    <AdminLayout pageTitle="Returns & Replacements">
      <div className="arp-page fade-in">
        {/* Tabs */}
        <div className="av-stats-row">
          {tabs.map(t => {
            const count = returnRequests.filter(r => getStatus(r) === t).length;
            return (
              <button
                key={t}
                className={`arp-tab-btn ${activeTab === t ? 'active' : ''}`}
                onClick={() => setActiveTab(t)}
              >
                {tabLabels[t]} <span className="arp-tab-count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Cards */}
        <div className="arp-cards">
          {filtered.length === 0 && <div className="arp-empty">No {tabLabels[activeTab].toLowerCase()} requests at this time.</div>}
          {filtered.map(r => {
            const isExpanded = expandedId === r.id;
            return (
              <div key={r.id} className={`arp-card ${isExpanded ? 'expanded' : ''}`}>
                {/* Collapsed row */}
                <div className="arp-card-header" onClick={() => setExpandedId(isExpanded ? null : r.id)}>
                  <div className="arp-card-meta">
                    <span className="arp-req-id">{r.id}</span>
                    <span className="arp-customer">{r.customer}</span>
                  </div>
                  <div className="arp-card-info">
                    <span className="arp-product-name">{r.product}</span>
                    <span className="arp-vendor">via {r.vendor}</span>
                  </div>
                  <div className="arp-card-right">
                    <span className={`arp-type-badge ${r.type === 'Return' ? 'arp-return' : 'arp-replace'}`}>{r.type}</span>
                    <span className="arp-date">{r.date}</span>
                    <span className={`av-badge ${getStatus(r) === 'pending' ? 'av-badge-pending' : getStatus(r) === 'approved' ? 'av-badge-active' : 'av-badge-suspended'}`}>
                      {tabLabels[getStatus(r)]}
                    </span>
                    {isExpanded ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                  </div>
                </div>

                {/* Expanded Detail */}
                {isExpanded && (
                  <div className="arp-expanded fade-in">
                    <div className="arp-images-row">
                      <div className="arp-img-block">
                        <p className="arp-img-label">Product</p>
                        <img src={r.productImage} alt="product" className="arp-img" />
                      </div>
                    </div>
                    <blockquote className="arp-reason">
                      <p>"{r.reason}"</p>
                      <cite>— {r.customer}</cite>
                    </blockquote>
                    {getStatus(r) === 'pending' && (
                      <div className="arp-action-row">
                        <div className="form-group" style={{ flex: 1 }}>
                          <label className="form-label">Admin Note (optional)</label>
                          <textarea className="form-input" rows={2} placeholder="Add a note…" value={notes[r.id] || ''} onChange={e => setNotes(n => ({ ...n, [r.id]: e.target.value }))} />
                        </div>
                        <div className="arp-btns">
                          <button className="arp-approve-btn" onClick={() => approve(r.id, r.type)}>
                            <FiCheckCircle size={15} /> Approve {r.type}
                          </button>
                          <button className="arp-reject-btn" onClick={() => reject(r.id)}>
                            <FiXCircle size={15} /> Reject
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
