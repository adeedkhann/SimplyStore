import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiDollarSign, FiBox, FiShoppingBag, FiCornerUpLeft, FiAlertTriangle, FiTrendingUp } from 'react-icons/fi';
import VendorLayout from '../../layouts/VendorLayout';
import { vendorProducts, vendorOrders, vendorRevenueChart } from '../../data/mockData';
import './VendorDashboardPage.css';

const kpiCards = [
  { label: 'Total Revenue', value: '$48,320', trend: '+12%', trendUp: true, icon: <FiDollarSign size={20} />, color: 'accent' },
  { label: 'Active Listings', value: '127', trend: '8 added', trendUp: true, icon: <FiBox size={20} />, color: 'primary' },
  { label: 'Pending Orders', value: '23', trend: 'Need attention', trendUp: false, icon: <FiShoppingBag size={20} />, color: 'warning' },
  { label: 'Return Requests', value: '4', trend: '2 new', trendUp: false, icon: <FiCornerUpLeft size={20} />, color: 'danger' },
];

const recentOrders = [
  { id: 'VO-1001', customer: 'Customer #4821', product: 'Premium Headphones', amount: 299, status: 'new' },
  { id: 'VO-1002', customer: 'Customer #3347', product: 'Bluetooth Speaker x2', amount: 298, status: 'ready' },
  { id: 'VO-1003', customer: 'Customer #7781', product: 'Mechanical Keyboard', amount: 189, status: 'shipped' },
  { id: 'VO-1004', customer: 'Customer #2294', product: 'USB-C Hub x3', amount: 177, status: 'delivered' },
  { id: 'VO-1005', customer: 'Customer #9103', product: 'Premium Headphones', amount: 299, status: 'return' },
];

const statusMap = {
  new: { label: 'New', cls: 'status-new' },
  ready: { label: 'Ready to Ship', cls: 'status-ready' },
  shipped: { label: 'Shipped', cls: 'status-shipped' },
  delivered: { label: 'Delivered', cls: 'status-delivered' },
  return: { label: 'Return', cls: 'status-return' },
};

const lowStockProducts = vendorProducts.filter(p => p.stock > 0 && p.stock < 10);

const maxChartVal = Math.max(...vendorRevenueChart.map(d => d.value));

export default function VendorDashboardPage() {
  const navigate = useNavigate();

  return (
    <VendorLayout pageTitle="Dashboard">
      <div className="vd-page fade-in">

        {/* KPI Cards */}
        <div className="vd-kpi-grid">
          {kpiCards.map((card, i) => (
            <div key={i} className={`vd-kpi-card vd-kpi-${card.color}`}>
              <div className="vd-kpi-top">
                <div className={`vd-kpi-icon vd-icon-${card.color}`}>{card.icon}</div>
                <span className={`vd-kpi-trend ${card.trendUp ? 'up' : 'down'}`}>
                  <FiTrendingUp size={11} />
                  {card.trend}
                </span>
              </div>
              <div className="vd-kpi-value">{card.value}</div>
              <div className="vd-kpi-label">{card.label}</div>
            </div>
          ))}
        </div>

        {/* Middle row */}
        <div className="vd-mid-row">
          {/* Revenue Chart */}
          <div className="vd-card vd-chart-card">
            <div className="vd-card-header">
              <h2 className="vd-card-title">Revenue Overview</h2>
              <span className="vd-card-meta">Last 6 months</span>
            </div>
            <div className="vd-bar-chart">
              {vendorRevenueChart.map((d, i) => (
                <div key={i} className="vd-bar-col">
                  <div className="vd-bar-wrap">
                    <div
                      className="vd-bar"
                      style={{ height: `${(d.value / maxChartVal) * 100}%` }}
                      title={`$${d.value.toLocaleString()}`}
                    >
                      <span className="vd-bar-tooltip">${(d.value / 1000).toFixed(1)}k</span>
                    </div>
                  </div>
                  <span className="vd-bar-label">{d.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="vd-card vd-orders-card">
            <div className="vd-card-header">
              <h2 className="vd-card-title">Recent Orders</h2>
              <button className="vd-view-all" onClick={() => navigate('/vendor/orders')}>View all</button>
            </div>
            <div className="vd-orders-list">
              {recentOrders.map(o => (
                <div key={o.id} className="vd-order-row">
                  <div className="vd-order-info">
                    <span className="vd-order-id">{o.id}</span>
                    <span className="vd-order-product">{o.product}</span>
                  </div>
                  <div className="vd-order-right">
                    <span className="vd-order-amount">${o.amount}</span>
                    <span className={`vd-status-badge ${statusMap[o.status].cls}`}>{statusMap[o.status].label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Low Stock Alerts */}
        {lowStockProducts.length > 0 && (
          <div className="vd-card vd-stock-card">
            <div className="vd-card-header">
              <div className="vd-card-title-row">
                <FiAlertTriangle size={16} className="vd-warn-icon" />
                <h2 className="vd-card-title">Low Stock Alerts</h2>
              </div>
              <span className="vd-card-meta">{lowStockProducts.length} product{lowStockProducts.length > 1 ? 's' : ''} running low</span>
            </div>
            <table className="vd-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Stock Left</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {lowStockProducts.map(p => (
                  <tr key={p.id} className="vd-stock-row-warn">
                    <td>
                      <div className="vd-table-product">
                        <img src={p.image} alt={p.name} className="vd-table-img" />
                        <span>{p.name}</span>
                      </div>
                    </td>
                    <td><code className="vd-sku">{p.sku}</code></td>
                    <td><span className="vd-stock-count warn">{p.stock} units</span></td>
                    <td>
                      <button className="btn btn-sm btn-secondary" onClick={() => navigate('/vendor/products')}>Restock</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </VendorLayout>
  );
}
