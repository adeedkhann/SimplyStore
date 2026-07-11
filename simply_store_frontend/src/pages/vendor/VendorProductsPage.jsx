import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiSearch, FiEdit2, FiToggleLeft, FiToggleRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import VendorLayout from '../../layouts/VendorLayout';
import { vendorProducts } from '../../data/mockData';
import './VendorProductsPage.css';

export default function VendorProductsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [products, setProducts] = useState(vendorProducts);

  const categories = ['All', 'Electronics', 'Workspace', 'Clothing', 'Home', 'Wellness'];
  const statuses = ['All', 'active', 'draft', 'out-of-stock'];

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === 'All' || p.category === categoryFilter;
    const matchStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchSearch && matchCat && matchStatus;
  });

  function toggleStatus(id) {
    setProducts(prev => prev.map(p => {
      if (p.id !== id) return p;
      return { ...p, status: p.status === 'active' ? 'draft' : 'active' };
    }));
  }

  function statusBadge(status) {
    if (status === 'active') return <span className="vp-badge vp-badge--active">Active</span>;
    if (status === 'draft') return <span className="vp-badge vp-badge--draft">Draft</span>;
    return <span className="vp-badge vp-badge--oos">Out of Stock</span>;
  }

  return (
    <VendorLayout pageTitle="My Products">
      <div className="vp-page">
        {/* Header */}
        <div className="vp-header">
          <div>
            <h2 className="vp-title">My Products</h2>
            <p className="vp-subtitle">{products.length} products in your store</p>
          </div>
          <button className="vp-add-btn" onClick={() => navigate('/vendor/products/add')}>
            <FiPlus size={16} />
            Add Product
          </button>
        </div>

        {/* Filters */}
        <div className="vp-filters">
          <div className="vp-search-wrap">
            <FiSearch size={16} className="vp-search-icon" />
            <input
              type="text"
              className="vp-search"
              placeholder="Search by name or SKU…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select className="vp-select" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
          <select className="vp-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            {statuses.map(s => <option key={s} value={s}>{s === 'All' ? 'All Status' : s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')}</option>)}
          </select>
        </div>

        {/* Table */}
        <div className="vp-table-wrap">
          <table className="vp-table">
            <thead>
              <tr>
                <th>#</th>
                <th colSpan={2}>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={p.id} className={p.stock < 10 && p.stock > 0 ? 'vp-row--low' : ''}>
                  <td className="vp-td-num">{i + 1}</td>
                  <td className="vp-td-img">
                    <img src={p.image} alt={p.name} className="vp-thumb" />
                  </td>
                  <td className="vp-td-name">
                    <span className="vp-prod-name">{p.name}</span>
                    <span className="vp-prod-sku">SKU: {p.sku}</span>
                  </td>
                  <td>{p.category}</td>
                  <td className="vp-td-price">${p.price}</td>
                  <td>
                    <span className={`vp-stock ${p.stock === 0 ? 'vp-stock--zero' : p.stock < 10 ? 'vp-stock--low' : ''}`}>
                      {p.stock}
                    </span>
                  </td>
                  <td>{statusBadge(p.status)}</td>
                  <td>
                    <div className="vp-actions">
                      <button className="vp-icon-btn" title="Edit product">
                        <FiEdit2 size={15} />
                      </button>
                      <button
                        className={`vp-icon-btn vp-toggle-btn ${p.status === 'active' ? 'active' : ''}`}
                        title={p.status === 'active' ? 'Set as Draft' : 'Set as Active'}
                        onClick={() => toggleStatus(p.id)}
                      >
                        {p.status === 'active' ? <FiToggleRight size={18} /> : <FiToggleLeft size={18} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="vp-empty">No products match your filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="vp-pagination">
          <button className="vp-page-btn"><FiChevronLeft size={14} /> Previous</button>
          <div className="vp-page-nums">
            <button className="vp-page-num active">1</button>
            <button className="vp-page-num">2</button>
            <button className="vp-page-num">3</button>
          </div>
          <button className="vp-page-btn">Next <FiChevronRight size={14} /></button>
        </div>
      </div>
    </VendorLayout>
  );
}
