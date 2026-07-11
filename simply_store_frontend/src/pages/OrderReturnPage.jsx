import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { orders } from '../data/mockData';
import { FiChevronLeft, FiCamera, FiCheckCircle, FiUpload, FiCornerUpLeft, FiRefreshCw } from 'react-icons/fi';
import './OrderReturnPage.css';

export default function OrderReturnPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find corresponding order
  const order = orders.find(o => o.id === id) || orders[0];
  const orderItem = order?.items[0]; // Pick the primary item for simplification

  // Form states
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [requestType, setRequestType] = useState(''); // 'Return' or 'Replace'

  function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  }

  function handleSubmit(type) {
    if (!message.trim()) {
      alert('Please fill out the request message.');
      return;
    }
    setRequestType(type);
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <div className="order-return-page container page-content fade-in">
        <div className="return-success-card">
          <div className="success-header">
            <FiCheckCircle size={48} className="success-tick-icon" />
            <h2>Request Sent Successfully</h2>
            <p className="success-subtitle">
              Your request for a <strong>{requestType}</strong> has been registered.
            </p>
          </div>

          <div className="divider"></div>

          <div className="success-details-summary">
            <h3 className="summary-section-title">Item Details</h3>
            <div className="summary-item-card">
              <img src={orderItem?.image} alt={orderItem?.name} className="summary-item-img" />
              <div>
                <h4 className="summary-item-title">{orderItem?.name}</h4>
                <p className="summary-item-brand">Sold by: {orderItem?.brand}</p>
                <p className="summary-item-order">Order ID: #{order?.id}</p>
              </div>
            </div>

            {photoPreview && (
              <div className="summary-uploaded-photo-wrap">
                <span className="summary-meta-lbl">Your Uploaded Photo:</span>
                <img src={photoPreview} alt="User upload preview" className="summary-uploaded-img" />
              </div>
            )}

            <div className="summary-message-wrap">
              <span className="summary-meta-lbl">Your Request Message:</span>
              <blockquote className="summary-message-quote">
                "{message}"
              </blockquote>
            </div>
          </div>

          <div className="success-actions">
            <button className="btn btn-primary btn-block" onClick={() => navigate('/orders')}>
              Go to Your Orders
            </button>
            <button className="btn btn-secondary btn-block" onClick={() => navigate('/home')}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-return-page container page-content fade-in">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FiChevronLeft size={16} />
        <span>Back</span>
      </button>

      <div className="return-form-card">
        <h1 className="return-title">Return or Replace Product</h1>
        <p className="return-subtitle">Please fill out the form below to file a request for your order.</p>

        {/* Selected Product Card Info */}
        <div className="selected-product-card">
          <img src={orderItem?.image} alt={orderItem?.name} className="selected-product-img" />
          <div className="selected-product-info">
            <span className="selected-product-brand">{orderItem?.brand}</span>
            <h3 className="selected-product-title">{orderItem?.name}</h3>
            <p className="selected-product-order">Order ID: #{order?.id}</p>
          </div>
        </div>

        {/* Upload Photo section */}
        <div className="form-group return-upload-group">
          <label className="form-label">Add Product Photo</label>
          <div className="photo-upload-drag-zone">
            {photoPreview ? (
              <div className="uploaded-preview-container">
                <img src={photoPreview} alt="Product upload preview" className="uploaded-preview-img" />
                <button className="remove-preview-btn" onClick={() => { setPhoto(null); setPhotoPreview(null); }}>
                  Remove & Upload New
                </button>
              </div>
            ) : (
              <label htmlFor="return-photo-file" className="upload-input-label">
                <FiUpload size={24} className="upload-zone-icon" />
                <span className="upload-zone-title">Click to upload photo</span>
                <span className="upload-zone-sub">Supports JPEG, PNG</span>
                <input 
                  id="return-photo-file"
                  type="file" 
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden-file-input"
                />
              </label>
            )}
          </div>
        </div>

        {/* Request Message Section */}
        <div className="form-group">
          <label className="form-label" htmlFor="return-reason-msg">Request Message</label>
          <textarea 
            id="return-reason-msg"
            className="form-input reason-textarea" 
            placeholder="Explain why you wish to return or replace this product..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={5}
            required
          />
        </div>

        {/* Submit Actions */}
        <div className="return-submit-actions">
          <button 
            className="btn btn-secondary action-btn-return"
            onClick={() => handleSubmit('Return')}
            id="return-btn"
          >
            <FiCornerUpLeft size={16} />
            <span>Return</span>
          </button>

          <button 
            className="btn btn-primary action-btn-replace"
            onClick={() => handleSubmit('Replace')}
            id="replace-btn"
          >
            <FiRefreshCw size={16} />
            <span>Replace</span>
          </button>
        </div>
      </div>
    </div>
  );
}
