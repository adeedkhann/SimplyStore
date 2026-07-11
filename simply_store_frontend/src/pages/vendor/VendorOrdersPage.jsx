import { useState } from 'react';
import { FiCheckCircle, FiPackage, FiTruck, FiRotateCcw, FiCheck } from 'react-icons/fi';
import VendorLayout from '../../layouts/VendorLayout';
import { vendorOrders } from '../../data/mockData';
import './VendorOrdersPage.css';

const TABS = [
  { key: 'new', label: 'New Orders' },
  { key: 'ready', label: 'Ready to Ship' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'delivered', label: 'Delivered' },
  { key: 'return', label: 'Returns' },
];

export default function VendorOrdersPage() {
  const [activeTab, setActiveTab] = useState('new');
  const [orders, setOrders] = useState(vendorOrders);
  const [trackingInputs, setTrackingInputs] = useState({});

  const filtered = orders.filter(o => o.status === activeTab);

  function moveStatus(id, newStatus, tracking = '') {
    setOrders(prev => prev.map(o =>
      o.id === id ? { ...o, status: newStatus, tracking: tracking || o.tracking } : o
    ));
  }

  const tabCounts = TABS.reduce((acc, t) => {
    acc[t.key] = orders.filter(o => o.status === t.key).length;
    return acc;
  }, {});

  return (
    <VendorLayout pageTitle="Order Fulfillment">
      <div className="vo-page">
        <div className="vo-header">
          <h2 className="vo-title">Order Fulfillment</h2>
          <p className="vo-subtitle">Manage and fulfill your customer orders</p>
        </div>

        {/* Tabs */}
        <div className="vo-tabs">
          {TABS.map(t => (
            <button
              key={t.key}
              className={`vo-tab ${activeTab === t.key ? 'active' : ''}`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
              {tabCounts[t.key] > 0 && (
                <span className="vo-tab-count">{tabCounts[t.key]}</span>
              )}
            </button>
          ))}
        </div>

        {/* Orders */}
        <div className="vo-orders">
          {filtered.length === 0 && (
            <div className="vo-empty">
              <FiPackage size={36} />
              <p>No orders in this category</p>
            </div>
          )}

          {filtered.map(order => (
            <div key={order.id} className="vo-card">
              <div className="vo-card-header">
                <div className="vo-order-meta">
                  <span className="vo-order-id">{order.id}</span>
                  <span className="vo-order-date">{order.date}</span>
                </div>
                <div className="vo-customer">
                  <div className="vo-customer-avatar">
                    {order.customer.charAt(order.customer.length - 4)}
                  </div>
                  <span className="vo-customer-name">{order.customer}</span>
                </div>
              </div>

              <div className="vo-items">
                {order.items.map((item, i) => (
                  <div key={i} className="vo-item">
                    <img src={item.image} alt={item.name} className="vo-item-img" />
                    <div className="vo-item-info">
                      <span className="vo-item-name">{item.name}</span>
                      <span className="vo-item-qty">Qty: {item.qty}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="vo-card-footer">
                <div className="vo-total">
                  Total: <strong>${order.total.toFixed(2)}</strong>
                </div>

                {/* Actions per tab */}
                {activeTab === 'new' && (
                  <button className="vo-btn vo-btn--primary" onClick={() => moveStatus(order.id, 'ready')}>
                    <FiCheckCircle size={14} /> Mark Ready to Ship
                  </button>
                )}

                {activeTab === 'ready' && (
                  <div className="vo-ship-row">
                    <input
                      type="text"
                      placeholder="Enter tracking number…"
                      className="vo-tracking-input"
                      value={trackingInputs[order.id] || ''}
                      onChange={e => setTrackingInputs(prev => ({ ...prev, [order.id]: e.target.value }))}
                    />
                    <button
                      className="vo-btn vo-btn--primary"
                      onClick={() => moveStatus(order.id, 'shipped', trackingInputs[order.id])}
                    >
                      <FiTruck size={14} /> Mark Shipped
                    </button>
                  </div>
                )}

                {activeTab === 'shipped' && (
                  <div className="vo-shipped-info">
                    <FiTruck size={14} />
                    <span>Tracking: <strong>{order.tracking}</strong></span>
                    <button className="vo-btn vo-btn--success" onClick={() => moveStatus(order.id, 'delivered')}>
                      <FiCheck size={13} /> Delivered
                    </button>
                  </div>
                )}

                {activeTab === 'delivered' && (
                  <span className="vo-badge vo-badge--delivered">
                    <FiCheck size={13} /> Delivered
                  </span>
                )}

                {activeTab === 'return' && (
                  <div className="vo-return-info">
                    <div className="vo-return-reason">
                      <FiRotateCcw size={13} />
                      <span>{order.returnReason || 'No reason provided'}</span>
                    </div>
                    <div className="vo-return-btns">
                      <button className="vo-btn vo-btn--success" onClick={() => moveStatus(order.id, 'delivered')}>
                        Approve Return
                      </button>
                      <button className="vo-btn vo-btn--danger">
                        Reject
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </VendorLayout>
  );
}
