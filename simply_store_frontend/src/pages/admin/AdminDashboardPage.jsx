import { useNavigate } from 'react-router-dom';
import { FiTrendingUp, FiUsers, FiUser, FiCornerUpLeft, FiDollarSign, FiActivity } from 'react-icons/fi';
import AdminLayout from '../../layouts/AdminLayout';
import { vendors, returnRequests, adminRevenueChart } from '../../data/mockData';
import './AdminDashboardPage.css';

const maxVal = Math.max(...adminRevenueChart.map(d => d.value));

const kpis = [
  { label: 'Total GMV', value: '$2.4M', trend: '+18%', icon: <FiDollarSign size={20} />, color: 'teal' },
  { label: 'Active Vendors', value: '142', trend: '+6 this month', icon: <FiUsers size={20} />, color: 'purple' },
  { label: 'Total Customers', value: '28,491', trend: '+1,204 this month', icon: <FiUser size={20} />, color: 'blue' },
  { label: 'Pending Returns', value: '17', trend: '3 new today', icon: <FiCornerUpLeft size={20} />, color: 'red' },
];

const topVendors = vendors.filter(v => v.status === 'active').sort((a, b) => b.revenue - a.revenue).slice(0, 5);

const activityFeed = [
  { icon: <FiUsers size={14} />, color: 'teal', text: 'New vendor Aura Botanica registered', time: '2 mins ago' },
  { icon: <FiCornerUpLeft size={14} />, color: 'green', text: 'Return #R-4520 approved by admin', time: '18 mins ago' },
  { icon: <FiActivity size={14} />, color: 'purple', text: 'Flash Sale event activated by admin', time: '1 hr ago' },
  { icon: <FiUsers size={14} />, color: 'teal', text: 'New vendor Morning Ritual pending approval', time: '2 hrs ago' },
  { icon: <FiUser size={14} />, color: 'red', text: 'Customer Marcus Bell account suspended', time: '3 hrs ago' },
  { icon: <FiDollarSign size={14} />, color: 'green', text: 'Payout of $4,200 processed for TechVision', time: '5 hrs ago' },
  { icon: <FiCornerUpLeft size={14} />, color: 'orange', text: 'Return #R-4521 filed by Jane Doe — needs review', time: '6 hrs ago' },
  { icon: <FiUsers size={14} />, color: 'purple', text: 'Vendor Table & Gather account suspended', time: '1 day ago' },
];

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  return (
    <AdminLayout pageTitle="Dashboard">
      <div className="adp-page fade-in">

        {/* KPIs */}
        <div className="adp-kpi-grid">
          {kpis.map((k, i) => (
            <div key={i} className={`adp-kpi-card adp-kpi-${k.color}`}>
              <div className="adp-kpi-top">
                <div className={`adp-kpi-icon adp-icon-${k.color}`}>{k.icon}</div>
                <span className="adp-kpi-trend"><FiTrendingUp size={10} /> {k.trend}</span>
              </div>
              <div className="adp-kpi-value">{k.value}</div>
              <div className="adp-kpi-label">{k.label}</div>
            </div>
          ))}
        </div>

        {/* Mid Row */}
        <div className="adp-mid-row">
          {/* Revenue Chart */}
          <div className="adp-card">
            <div className="adp-card-header">
              <h2 className="adp-card-title">Platform Revenue</h2>
              <span className="adp-card-meta">Last 6 months</span>
            </div>
            <div className="adp-bar-chart">
              {adminRevenueChart.map((d, i) => (
                <div key={i} className="adp-bar-col">
                  <div className="adp-bar-wrap">
                    <div className="adp-bar" style={{ height: `${(d.value / maxVal) * 100}%` }} title={`$${d.value.toLocaleString()}`}>
                      <span className="adp-bar-tooltip">${(d.value / 1000).toFixed(0)}k</span>
                    </div>
                  </div>
                  <span className="adp-bar-label">{d.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Vendors */}
          <div className="adp-card">
            <div className="adp-card-header">
              <h2 className="adp-card-title">Top Vendors</h2>
              <button className="adp-view-all" onClick={() => navigate('/admin/vendors')}>View all</button>
            </div>
            <table className="adp-table">
              <thead><tr><th>#</th><th>Vendor</th><th>Revenue</th><th>Growth</th></tr></thead>
              <tbody>
                {topVendors.map((v, i) => (
                  <tr key={v.id}>
                    <td className="adp-rank">{i === 0 ? '👑' : i + 1}</td>
                    <td>
                      <div className="adp-vendor-cell">
                        <div className="adp-logo-circle adp-logo-sm">{v.logo}</div>
                        <span>{v.name}</span>
                      </div>
                    </td>
                    <td><strong>${v.revenue.toLocaleString()}</strong></td>
                    <td><span className="adp-growth-badge">+{(Math.random() * 20 + 5).toFixed(0)}%</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="adp-card">
          <div className="adp-card-header">
            <h2 className="adp-card-title">Recent Activity</h2>
          </div>
          <div className="adp-feed">
            {activityFeed.map((e, i) => (
              <div key={i} className="adp-feed-item">
                <div className={`adp-feed-dot adp-dot-${e.color}`}>{e.icon}</div>
                <div className="adp-feed-line-wrap">
                  <span className="adp-feed-text">{e.text}</span>
                  <span className="adp-feed-time">{e.time}</span>
                </div>
                {i < activityFeed.length - 1 && <div className="adp-feed-connector" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
