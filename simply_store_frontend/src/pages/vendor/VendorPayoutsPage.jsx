import { useState } from 'react';
import VendorLayout from '../../layouts/VendorLayout';
import { vendorPayouts } from '../../data/mockData';
import { FiDollarSign, FiClock, FiTrendingUp, FiChevronDown } from 'react-icons/fi';
import './VendorPayoutsPage.css';

export default function VendorPayoutsPage() {
  const [showPayoutForm, setShowPayoutForm] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  function handleConfirm(e) {
    e.preventDefault();
    setConfirmed(true);
    setShowPayoutForm(false);
    setPayoutAmount('');
    setTimeout(() => setConfirmed(false), 4000);
  }

  return (
    <VendorLayout pageTitle="Payouts">
      <div className="vpp-page fade-in">

        {/* Balance Cards */}
        <div className="vpp-balance-grid">
          <div className="vpp-balance-card vpp-available">
            <div className="vpp-balance-top">
              <div className="vpp-balance-icon vpp-icon-green"><FiDollarSign size={20} /></div>
              <span className="vpp-balance-label">Available Balance</span>
            </div>
            <div className="vpp-balance-amount">$12,450.00</div>
            <button
              className="btn btn-primary btn-sm vpp-payout-btn"
              onClick={() => setShowPayoutForm(v => !v)}
            >
              {showPayoutForm ? 'Cancel' : 'Request Payout'}
              <FiChevronDown size={13} style={{ transform: showPayoutForm ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
          </div>

          <div className="vpp-balance-card vpp-pending">
            <div className="vpp-balance-top">
              <div className="vpp-balance-icon vpp-icon-orange"><FiClock size={20} /></div>
              <span className="vpp-balance-label">Pending Clearance</span>
            </div>
            <div className="vpp-balance-amount">$3,200.00</div>
            <p className="vpp-balance-note">Clears in 3–5 business days</p>
          </div>

          <div className="vpp-balance-card vpp-total">
            <div className="vpp-balance-top">
              <div className="vpp-balance-icon vpp-icon-purple"><FiTrendingUp size={20} /></div>
              <span className="vpp-balance-label">Total Earned</span>
            </div>
            <div className="vpp-balance-amount">$48,320.00</div>
            <p className="vpp-balance-note">Since Mar 12, 2023</p>
          </div>
        </div>

        {/* Payout Request Form */}
        {showPayoutForm && (
          <div className="vpp-payout-form-card fade-in">
            <h3 className="vpp-form-title">Request a Payout</h3>
            <p className="vpp-form-sub">Funds will be transferred to your registered bank account ending in ****4521.</p>
            <form onSubmit={handleConfirm} className="vpp-form-row">
              <div className="form-group vpp-amount-group">
                <label className="form-label" htmlFor="payout-amount">Amount (USD)</label>
                <div className="vap-price-wrap">
                  <span className="vap-price-prefix">$</span>
                  <input
                    id="payout-amount"
                    type="number"
                    className="form-input vap-price-input"
                    placeholder="0.00"
                    max="12450"
                    min="1"
                    value={payoutAmount}
                    onChange={e => setPayoutAmount(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary vpp-confirm-btn">Confirm Payout</button>
            </form>
          </div>
        )}

        {/* Success Banner */}
        {confirmed && (
          <div className="vpp-success-banner fade-in">
            ✓ Payout request submitted! Funds will arrive within 3–5 business days.
          </div>
        )}

        {/* Payout History */}
        <div className="vpp-history-card">
          <div className="vpp-history-header">
            <h2 className="vpp-history-title">Payout History</h2>
          </div>
          <table className="vd-table">
            <thead>
              <tr>
                <th>Payout ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Status</th>
                <th>Reference</th>
              </tr>
            </thead>
            <tbody>
              {vendorPayouts.map(p => (
                <tr key={p.id}>
                  <td><code className="vd-sku">{p.id}</code></td>
                  <td>{p.date}</td>
                  <td><strong>${p.amount.toLocaleString()}</strong></td>
                  <td>{p.method}</td>
                  <td>
                    <span className={`vpp-status-pill ${p.status === 'paid' ? 'vpp-paid' : 'vpp-processing'}`}>
                      {p.status === 'paid' ? 'Paid' : 'Processing'}
                    </span>
                  </td>
                  <td><code className="vd-sku">{p.ref}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </VendorLayout>
  );
}
