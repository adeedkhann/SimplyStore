import { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { adminCustomers } from '../../data/mockData';
import { FiSearch } from 'react-icons/fi';
import './AdminCustomersPage.css';

export default function AdminCustomersPage() {
  const [search, setSearch] = useState('');
  const [customerStatuses, setCustomerStatuses] = useState({});

  const getStatus = c => customerStatuses[c.id] || c.status;
  const filtered = adminCustomers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = id => setCustomerStatuses(s => ({ ...s, [id]: getStatus(adminCustomers.find(c => c.id === id)) === 'active' ? 'banned' : 'active' }));

  const activeCount = adminCustomers.filter(c => (customerStatuses[c.id] || c.status) === 'active').length;
  const bannedCount = adminCustomers.filter(c => (customerStatuses[c.id] || c.status) === 'banned').length;

  return (
    <AdminLayout pageTitle="Customers">
      <div className="acp-page fade-in">
        {/* Stats */}
        <div className="av-stats-row">
          <span className="av-stat-pill av-stat-active">Total: {adminCustomers.length}</span>
          <span className="av-stat-pill av-stat-active">Active: {activeCount}</span>
          <span className="av-stat-pill av-stat-suspended">Banned: {bannedCount}</span>
        </div>

        {/* Search */}
        <div className="av-toolbar">
          <div className="av-search-wrap">
            <FiSearch size={16} className="av-search-icon" />
            <input className="av-search-input" placeholder="Search customers by name or email…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        {/* Table */}
        <div className="av-table-card">
          <table className="av-table">
            <thead>
              <tr><th>#</th><th>Customer</th><th>Email</th><th>Joined</th><th>Orders</th><th>Spent</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => {
                const st = getStatus(c);
                return (
                  <tr key={c.id} className={st === 'banned' ? 'acp-row-banned' : ''}>
                    <td className="av-num">{i + 1}</td>
                    <td>
                      <div className="av-vendor-cell">
                        <div className="acp-avatar">{c.avatar}</div>
                        <span className="av-vendor-name">{c.name}</span>
                      </div>
                    </td>
                    <td className="acp-email">{c.email}</td>
                    <td>{c.joinDate}</td>
                    <td>{c.orders}</td>
                    <td>${c.spent.toLocaleString()}</td>
                    <td>
                      <span className={`av-badge ${st === 'active' ? 'av-badge-active' : 'av-badge-suspended'}`}>
                        {st === 'active' ? 'Active' : 'Banned'}
                      </span>
                    </td>
                    <td>
                      <button
                        className={`av-btn ${st === 'active' ? 'acp-btn-ban' : 'av-btn-reactivate'}`}
                        onClick={() => toggle(c.id)}
                      >
                        {st === 'active' ? 'Ban' : 'Unban'}
                      </button>
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
