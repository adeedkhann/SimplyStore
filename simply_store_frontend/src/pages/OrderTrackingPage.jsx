import { useNavigate } from 'react-router-dom';
import { trackingData } from '../data/mockData';
import { FiMapPin, FiTruck, FiCheck, FiPackage, FiCalendar, FiClock, FiInbox, FiPhoneCall } from 'react-icons/fi';
import './OrderTrackingPage.css';

export default function OrderTrackingPage() {
  const navigate = useNavigate();
  const { orderId, status, estimatedArrival, estimatedTime, steps, delivery } = trackingData;

  function getStepIcon(step, idx) {
    if (step.status === 'done') {
      return <div className="step-icon done"><FiCheck size={14} /></div>;
    }
    if (step.status === 'active') {
      return <div className="step-icon active"><FiTruck size={14} /></div>;
    }
    return <div className="step-icon pending"><FiInbox size={14} /></div>;
  }

  return (
    <div className="order-tracking-page container page-content fade-in">
      {/* Breadcrumb */}
      <div className="breadcrumb-wrap">
        <div className="breadcrumb">
          <a href="/home">Home</a>
          <span className="breadcrumb-sep">/</span>
          <a href="/orders">Orders</a>
          <span className="breadcrumb-sep">/</span>
          <span className="text-primary">{orderId}</span>
        </div>
      </div>

      {/* Header */}
      <div className="tracking-header-row">
        <h1 className="tracking-title">Track Your Order</h1>
        <span className="tracking-id-badge">📦 {orderId}</span>
      </div>

      {/* Current Status Widget */}
      <div className="status-overview-card">
        <div className="status-overview-left">
          <div className="status-icon-glow">
            <FiTruck size={24} className="text-primary" />
          </div>
          <div>
            <span className="overview-lbl">CURRENT STATUS</span>
            <h2 className="overview-val">{status}</h2>
          </div>
        </div>
        
        <div className="status-overview-divider"></div>

        <div className="status-overview-right">
          <div>
            <span className="overview-lbl">ESTIMATED ARRIVAL</span>
            <h2 className="overview-val arrival-text">{estimatedArrival}</h2>
            <span className="overview-sublbl">{estimatedTime}</span>
          </div>
        </div>
      </div>

      {/* Steps Stepper */}
      <div className="stepper-card">
        <div className="stepper-timeline">
          {steps.map((step, idx) => (
            <div key={idx} className={`stepper-step ${step.status}`}>
              {getStepIcon(step, idx)}
              <div className="step-details">
                <h4 className="step-label">{step.label}</h4>
                <p className="step-time">
                  {step.date && <span>{step.date}, </span>}
                  {step.time}
                </p>
              </div>
              {idx < steps.length - 1 && (
                <div className={`stepper-line ${steps[idx + 1].status === 'done' || steps[idx + 1].status === 'active' ? 'done' : 'pending'}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Split Details Section */}
      <div className="tracking-split-layout">
        {/* Map mockup */}
        <div className="map-mockup-wrap">
          <div className="map-placeholder">
            {/* Embedded mockup map visual structure */}
            <div className="map-header-bar">
              <span className="map-tag">San Francisco</span>
            </div>
            
            {/* Render styling coordinates for Map look */}
            <div className="map-grid-art">
              <div className="map-road horiz-1"></div>
              <div className="map-road horiz-2"></div>
              <div className="map-road vert-1"></div>
              <div className="map-road vert-2"></div>
              
              <div className="map-water-area"></div>
              
              <div className="map-point pin-1"></div>
              <div className="map-point pin-2"></div>
              
              <div className="delivery-route-line"></div>
              
              {/* Target Location marker */}
              <div className="active-driver-marker">
                <FiTruck size={14} className="driver-truck" />
                <span className="driver-pulse"></span>
              </div>

              {/* Destination marker */}
              <div className="destination-marker">
                <FiMapPin size={16} className="dest-pin" />
              </div>
            </div>

            <div className="map-status-overlay">
              <span className="map-overlay-lbl">Current Location</span>
              <span className="map-overlay-val">2 Miles Away</span>
            </div>
          </div>
        </div>

        {/* Address and actions info */}
        <div className="tracking-details-col">
          {/* Delivery Details */}
          <div className="detail-info-card">
            <h3 className="detail-card-title">Delivery Details</h3>
            
            <div className="detail-rows">
              <div className="detail-row">
                <FiMapPin size={16} className="detail-icon" />
                <div>
                  <span className="detail-lbl">SHIPPING ADDRESS</span>
                  <p className="detail-val">{delivery.address}</p>
                </div>
              </div>

              <div className="detail-row">
                <FiTruck size={16} className="detail-icon" />
                <div>
                  <span className="detail-lbl">COURIER</span>
                  <p className="detail-val">{delivery.courier}</p>
                </div>
              </div>

              <div className="detail-row">
                <span className="detail-icon tracking-symbol">#</span>
                <div>
                  <span className="detail-lbl">TRACKING ID</span>
                  <p className="detail-val tracking-code">
                    {delivery.trackingId}
                    <button className="copy-tracking-btn" onClick={() => navigator.clipboard.writeText(delivery.trackingId)}>Copy</button>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Support Actions */}
          <div className="detail-info-card actions-card">
            <h3 className="detail-card-title">Support & Actions</h3>
            <div className="tracking-actions-list">
              <button 
                className="btn btn-primary btn-block tracking-act-btn"
                onClick={() => {
                  alert("Delivery instruction updated: 'Leave at front door' has been saved.");
                }}
              >
                Manage Delivery
              </button>
              <button 
                className="btn btn-secondary btn-block tracking-act-btn"
                onClick={() => navigate('/orders')}
              >
                View Order Details
              </button>
              <button 
                className="btn btn-secondary btn-block tracking-act-btn contact-btn"
                onClick={() => navigate('/contact')}
              >
                <FiPhoneCall size={14} />
                <span>Contact Support</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
