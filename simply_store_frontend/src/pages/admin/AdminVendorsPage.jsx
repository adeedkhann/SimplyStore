import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout';
import { vendors } from '../../data/mockData';
import { FiSearch, FiEye, FiCheckCircle, FiXCircle, FiRefreshCw } from 'react-icons/fi';
import './AdminVendorsPage.css';

const statusMap = { active: { label: 'Active', cls: 'av-badge-active' }, pending: { label: 'Pending Approval', cls: 'av-badge-pending' }, suspended: { label: 'Suspended', cls: 'av-badge-suspended' } };
const logoColors = ['#4B3DE3','#0D9488','#F59E0B','#EF4444','#8B5CF6','#3B82F6','#EC4899','#10B981'];

export default function AdminVendorsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [vendorStatuses, setVendorStatuses] = useState({});

  const getStatus = v => vendorStatuses[v.id] || v.status;

  const filtered = vendors.filter(v => {
    const s = getStatus(v);
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.owner.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || s === statusFilter;
    return matchSearch && matchStatus;
  });

  const setStatus = (id, status) => setVendorStatuses(s => ({ ...s, [id]: status }));

  return (
    <AdminLayout pageTitle="Vendors">
      <div className="av-page fade-in">
        {/* Stats Pills */}
        <div className="av-stats-row">
          <span className="av-stat-pill av-stat-active">Active: {vendors.filter(v => (vendorStatuses[v.id]||v.status)==='active').length}</span>
          <span className="av-stat-pill av-stat-pending">Pending Approval: {vendors.filter(v => (vendorStatuses[v.id]||v.status)==='pending').length}</span>
          <span className="av-stat-pill av-stat-suspended">Suspended: {vendors.filter(v => (vendorStatuses[v.id]||v.status)==='suspended').length}</span>
        </div>

        {/* Header + Filters */}
        <div className="av-toolbar">
          <div className="av-search-wrap">
            <FiSearch size={16} className="av-search-icon" />
            <input className="av-search-input" placeholder="Search vendors…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="form-input av-filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
          <button className="btn btn-primary btn-sm">+ Invite Vendor</button>
        </div>

        {/* Table */}
        <div className="av-table-card">
          <table className="av-table">
            <thead>
              <tr><th>#</th><th>Vendor</th><th>Owner</th><th>Products</th><th>Revenue</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map((v, i) => {
                const st = getStatus(v);
                return (
                  <tr key={v.id} className={st === 'suspended' ? 'av-row-suspended' : st === 'pending' ? 'av-row-pending' : ''}>
                    <td className="av-num">{i + 1}</td>
                    <td>
                      <div className="av-vendor-cell">
                        <div className="av-logo" style={{ background: logoColors[i % logoColors.length] }}>{v.logo}</div>
                        <div><div className="av-vendor-name">{v.name}</div><div className="av-vendor-cat">{v.category}</div></div>
                      </div>
                    </td>
                    <td>{v.owner}</td>
                    <td>{v.products}</td>
                    <td>{v.revenue > 0 ? `$${v.revenue.toLocaleString()}` : '—'}</td>
                    <td><span className={`av-badge ${statusMap[st].cls}`}>{statusMap[st].label}</span></td>
                    <td>
                      <div className="av-actions">
                        {st === 'pending' && <>
                          <button className="av-btn av-btn-approve" onClick={() => setStatus(v.id, 'active')}><FiCheckCircle size={14} /> Approve</button>
                          <button className="av-btn av-btn-reject" onClick={() => setStatus(v.id, 'suspended')}><FiXCircle size={14} /> Reject</button>
                        </>}
                        {st === 'active' && <button className="av-btn av-btn-view" onClick={() => navigate(`/admin/vendors/${v.id}`)}><FiEye size={14} /> View</button>}
                        {st === 'suspended' && <button className="av-btn av-btn-reactivate" onClick={() => setStatus(v.id, 'active')}><FiRefreshCw size={14} /> Reactivate</button>}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
