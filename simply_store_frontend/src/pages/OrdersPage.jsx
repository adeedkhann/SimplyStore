import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { orders } from '../data/mockData';
import { FiChevronDown, FiCalendar, FiPackage, FiTruck, FiCornerUpLeft, FiAlertCircle } from 'react-icons/fi';
import './OrdersPage.css';

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [timeFilter, setTimeFilter] = useState('3-months');
  const navigate = useNavigate();

  const tabs = [
    { id: 'all', label: 'All Orders' },
    { id: 'not-shipped', label: 'Not Yet Shipped' },
    { id: 'cancelled', label: 'Cancelled' }
  ];

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    if (activeTab === 'not-shipped') return order.status === 'not-shipped';
    if (activeTab === 'cancelled') return order.status === 'cancelled';
    return true;
  });

  function handleActionClick(action, orderId) {
    if (action === 'Track Package') {
      navigate(`/orders/${orderId}/track`);
    } else if (action === 'Return or Replace') {
      navigate(`/orders/${orderId}/return`);
    } else {
      alert(`${action} triggered for order ${orderId}`);
    }
  }

  function getStatusIcon(status) {
    if (status === 'delivered') return <FiPackage className="status-ico delivered" />;
    if (status === 'in-transit') return <FiTruck className="status-ico transit" />;
    return <FiAlertCircle className="status-ico processing" />;
  }

  return (
    <div className="orders-page container page-content fade-in">
      {/* Breadcrumb */}
      <div className="breadcrumb-wrap">
        <div className="breadcrumb">
          <a href="/home">Account</a>
          <span className="breadcrumb-sep">/</span>
          <span className="text-primary">Your Orders</span>
        </div>
      </div>

      <div className="orders-header-row">
        <h1 className="orders-title">Your Orders</h1>
        
        {/* Time Filter Select */}
        <div className="time-filter-wrap">
          <select 
            value={timeFilter}
            onChange={e => setTimeFilter(e.target.value)}
            className="time-filter-select"
          >
            <option value="3-months">Last 3 months</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="orders-tabs-wrap">
        <div className="orders-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`orders-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              id={`orders-tab-${tab.id}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="orders-list">
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <div key={order.id} className="order-card-wrapper">
              {/* Card Header metadata */}
              <div className="order-card-header">
                <div className="order-header-meta">
                  <div className="meta-item">
                    <span className="meta-lbl">ORDER PLACED</span>
                    <span className="meta-val">{order.date}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-lbl">TOTAL</span>
                    <span className="meta-val">${order.total.toFixed(2)}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-lbl">SHIP TO</span>
                    <span className="meta-val ship-to-link">{order.shipTo}</span>
                  </div>
                </div>

                <div className="order-header-id-invoice">
                  <div className="meta-item align-right">
                    <span className="meta-lbl">ORDER # {order.id}</span>
                    <div className="invoice-actions">
                      <button className="invoice-btn" onClick={() => handleActionClick('View Order Details', order.id)}>View Order Details</button>
                      <span className="invoice-sep">|</span>
                      <button className="invoice-btn" onClick={() => handleActionClick('Invoice', order.id)}>Invoice</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="order-card-body">
                {/* Status Bar */}
                <div className="order-status-banner">
                  {getStatusIcon(order.status)}
                  <div>
                    <h3 className="status-label-title">{order.statusLabel}</h3>
                    {order.statusNote && <p className="status-note-txt">{order.statusNote}</p>}
                  </div>
                </div>

                {/* Items and actions split */}
                <div className="order-content-split">
                  {/* Items list */}
                  <div className="order-items-list-preview">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="order-item-row">
                        <img src={item.image} alt={item.name} className="order-item-img-preview" />
                        <div className="order-item-info-preview">
                          <h4 className="order-item-name-preview">{item.name}</h4>
                          <p className="order-item-brand-preview">Sold by: {item.brand}</p>
                          <button 
                            className="btn btn-secondary btn-sm buy-again-btn"
                            onClick={() => navigate('/shop/all')}
                            id={`buy-again-${item.id}`}
                          >
                            Buy it Again
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions Column */}
                  <div className="order-actions-column">
                    {order.actions.map((action, aIdx) => (
                      <button
                        key={aIdx}
                        className={`btn btn-block order-action-btn-item ${aIdx === 0 ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => handleActionClick(action, order.id)}
                        id={`order-action-${order.id}-${aIdx}`}
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-orders-found">
            <FiPackage size={40} className="text-muted" />
            <h3>No orders found</h3>
            <p>You haven't placed any orders matching this filter.</p>
            <button className="btn btn-primary" onClick={() => navigate('/shop/all')}>Go to Shop</button>
          </div>
        )}
      </div>
    </div>
  );
}
