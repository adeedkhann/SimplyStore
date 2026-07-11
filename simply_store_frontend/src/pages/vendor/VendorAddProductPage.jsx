import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck, FiUpload, FiX, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import VendorLayout from '../../layouts/VendorLayout';
import './VendorAddProductPage.css';

const STEPS = ['Basic Info', 'Pricing & Stock', 'Variants', 'Media', 'Review'];

const COLORS = [
  { label: 'Black', hex: '#1A1A2E' },
  { label: 'White', hex: '#F7F7FC' },
  { label: 'Red', hex: '#EF4444' },
  { label: 'Blue', hex: '#3B82F6' },
  { label: 'Green', hex: '#10B981' },
  { label: 'Purple', hex: '#8B5CF6' },
  { label: 'Gold', hex: '#F59E0B' },
  { label: 'Silver', hex: '#9CA3AF' },
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const CATEGORIES = ['Electronics', 'Clothing', 'Home & Living', 'Wellness', 'Dining', 'Workspace', 'Textiles'];

export default function VendorAddProductPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '', brand: '', category: '', description: '',
    price: '', comparePrice: '', stock: '', sku: '',
    selectedColors: [], selectedSizes: [],
    images: [],
  });
  const [published, setPublished] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef();

  function update(field, value) {
    setFormData(prev => ({ ...prev, [field]: value }));
  }

  function toggleColor(label) {
    setFormData(prev => ({
      ...prev,
      selectedColors: prev.selectedColors.includes(label)
        ? prev.selectedColors.filter(c => c !== label)
        : [...prev.selectedColors, label],
    }));
  }

  function toggleSize(s) {
    setFormData(prev => ({
      ...prev,
      selectedSizes: prev.selectedSizes.includes(s)
        ? prev.selectedSizes.filter(x => x !== s)
        : [...prev.selectedSizes, s],
    }));
  }

  function handleFiles(files) {
    const newImgs = Array.from(files).slice(0, 5 - formData.images.length).map(f => ({
      url: URL.createObjectURL(f),
      name: f.name,
    }));
    setFormData(prev => ({ ...prev, images: [...prev.images, ...newImgs].slice(0, 5) }));
  }

  function removeImage(idx) {
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  }

  function publish() {
    setPublished(true);
    setTimeout(() => navigate('/vendor/products'), 2200);
  }

  return (
    <VendorLayout pageTitle="Add Product">
      <div className="vap-page">
        {/* Stepper */}
        <div className="vap-stepper">
          {STEPS.map((label, i) => (
            <div key={label} className={`vap-step ${i < step ? 'done' : i === step ? 'active' : ''}`}>
              <div className="vap-step-circle">
                {i < step ? <FiCheck size={13} /> : <span>{i + 1}</span>}
              </div>
              <span className="vap-step-label">{label}</span>
              {i < STEPS.length - 1 && <div className="vap-step-line" />}
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="vap-card">
          {published && (
            <div className="vap-success">
              <FiCheck size={24} />
              <span>Product published successfully! Redirecting…</span>
            </div>
          )}

          {!published && (
            <>
              {/* Step 1 */}
              {step === 0 && (
                <div className="vap-step-content">
                  <h3 className="vap-step-title">Basic Information</h3>
                  <div className="vap-form-grid">
                    <div className="vap-field">
                      <label>Product Name <span className="vap-req">*</span></label>
                      <input type="text" placeholder="e.g. Premium Noise-Cancelling Headphones" value={formData.name} onChange={e => update('name', e.target.value)} />
                    </div>
                    <div className="vap-field">
                      <label>Brand</label>
                      <input type="text" placeholder="e.g. TechVision" value={formData.brand} onChange={e => update('brand', e.target.value)} />
                    </div>
                    <div className="vap-field">
                      <label>Category <span className="vap-req">*</span></label>
                      <select value={formData.category} onChange={e => update('category', e.target.value)}>
                        <option value="">Select category…</option>
                        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="vap-field vap-field--full">
                      <label>Description</label>
                      <textarea rows={4} placeholder="Write a compelling product description…" value={formData.description} onChange={e => update('description', e.target.value)} />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 1 && (
                <div className="vap-step-content">
                  <h3 className="vap-step-title">Pricing & Stock</h3>
                  <div className="vap-form-grid">
                    <div className="vap-field">
                      <label>Selling Price <span className="vap-req">*</span></label>
                      <div className="vap-input-prefix">
                        <span>$</span>
                        <input type="number" placeholder="0.00" value={formData.price} onChange={e => update('price', e.target.value)} />
                      </div>
                    </div>
                    <div className="vap-field">
                      <label>Compare-at Price</label>
                      <div className="vap-input-prefix">
                        <span>$</span>
                        <input type="number" placeholder="0.00" value={formData.comparePrice} onChange={e => update('comparePrice', e.target.value)} />
                      </div>
                      {formData.comparePrice && formData.price && (
                        <p className="vap-compare-preview">
                          Was: <s>${formData.comparePrice}</s> → Now: ${formData.price}
                        </p>
                      )}
                    </div>
                    <div className="vap-field">
                      <label>Stock Quantity <span className="vap-req">*</span></label>
                      <input type="number" placeholder="0" value={formData.stock} onChange={e => update('stock', e.target.value)} />
                    </div>
                    <div className="vap-field">
                      <label>SKU</label>
                      <input type="text" placeholder="e.g. TC-HP-001" value={formData.sku} onChange={e => update('sku', e.target.value)} />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 2 && (
                <div className="vap-step-content">
                  <h3 className="vap-step-title">Variants</h3>
                  <div className="vap-variants-section">
                    <h4 className="vap-variants-label">Colors</h4>
                    <div className="vap-colors">
                      {COLORS.map(c => (
                        <button
                          key={c.label}
                          className={`vap-color-btn ${formData.selectedColors.includes(c.label) ? 'selected' : ''}`}
                          style={{ background: c.hex }}
                          title={c.label}
                          onClick={() => toggleColor(c.label)}
                          type="button"
                        >
                          {formData.selectedColors.includes(c.label) && (
                            <FiCheck size={12} style={{ color: c.hex === '#F7F7FC' ? '#333' : '#fff' }} />
                          )}
                        </button>
                      ))}
                    </div>
                    {formData.selectedColors.length > 0 && (
                      <p className="vap-selected-hint">Selected: {formData.selectedColors.join(', ')}</p>
                    )}
                  </div>
                  <div className="vap-variants-section">
                    <h4 className="vap-variants-label">Sizes</h4>
                    <div className="vap-sizes">
                      {SIZES.map(s => (
                        <button
                          key={s}
                          className={`vap-size-chip ${formData.selectedSizes.includes(s) ? 'selected' : ''}`}
                          onClick={() => toggleSize(s)}
                          type="button"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4 */}
              {step === 3 && (
                <div className="vap-step-content">
                  <h3 className="vap-step-title">Media</h3>
                  <div
                    className={`vap-dropzone ${dragging ? 'dragging' : ''}`}
                    onDragOver={e => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileRef.current.click()}
                  >
                    <FiUpload size={28} className="vap-upload-icon" />
                    <p className="vap-upload-title">Drag & drop images here</p>
                    <p className="vap-upload-sub">or click to browse — up to 5 images (JPG, PNG, WebP)</p>
                  </div>
                  <input type="file" ref={fileRef} multiple accept="image/*" style={{ display: 'none' }} onChange={e => handleFiles(e.target.files)} />

                  {formData.images.length > 0 && (
                    <div className="vap-previews">
                      {formData.images.map((img, i) => (
                        <div key={i} className="vap-preview-item">
                          <img src={img.url} alt={img.name} />
                          {i === 0 && <span className="vap-primary-badge">Primary</span>}
                          <button className="vap-remove-img" onClick={e => { e.stopPropagation(); removeImage(i); }}>
                            <FiX size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Step 5 */}
              {step === 4 && (
                <div className="vap-step-content">
                  <h3 className="vap-step-title">Review & Publish</h3>
                  <div className="vap-review-card">
                    <div className="vap-review-row">
                      <span className="vap-review-label">Product Name</span>
                      <span className="vap-review-val">{formData.name || '—'}</span>
                    </div>
                    <div className="vap-review-row">
                      <span className="vap-review-label">Brand</span>
                      <span className="vap-review-val">{formData.brand || '—'}</span>
                    </div>
                    <div className="vap-review-row">
                      <span className="vap-review-label">Category</span>
                      <span className="vap-review-val">{formData.category || '—'}</span>
                    </div>
                    <div className="vap-review-row">
                      <span className="vap-review-label">Selling Price</span>
                      <span className="vap-review-val">{formData.price ? `$${formData.price}` : '—'}</span>
                    </div>
                    <div className="vap-review-row">
                      <span className="vap-review-label">Stock Qty</span>
                      <span className="vap-review-val">{formData.stock || '—'}</span>
                    </div>
                    <div className="vap-review-row">
                      <span className="vap-review-label">SKU</span>
                      <span className="vap-review-val">{formData.sku || '—'}</span>
                    </div>
                    <div className="vap-review-row">
                      <span className="vap-review-label">Colors</span>
                      <span className="vap-review-val">{formData.selectedColors.join(', ') || '—'}</span>
                    </div>
                    <div className="vap-review-row">
                      <span className="vap-review-label">Sizes</span>
                      <span className="vap-review-val">{formData.selectedSizes.join(', ') || '—'}</span>
                    </div>
                    <div className="vap-review-row">
                      <span className="vap-review-label">Images</span>
                      <span className="vap-review-val">{formData.images.length} uploaded</span>
                    </div>
                    {formData.description && (
                      <div className="vap-review-row vap-review-row--desc">
                        <span className="vap-review-label">Description</span>
                        <span className="vap-review-val">{formData.description}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="vap-nav-btns">
                {step > 0 ? (
                  <button className="vap-btn vap-btn--back" onClick={() => setStep(s => s - 1)}>
                    <FiArrowLeft size={15} /> Back
                  </button>
                ) : (
                  <button className="vap-btn vap-btn--back" onClick={() => navigate('/vendor/products')}>
                    Cancel
                  </button>
                )}
                {step < 4 ? (
                  <button className="vap-btn vap-btn--continue" onClick={() => setStep(s => s + 1)}>
                    Continue <FiArrowRight size={15} />
                  </button>
                ) : (
                  <div className="vap-publish-btns">
                    <button className="vap-btn vap-btn--draft" onClick={() => navigate('/vendor/products')}>
                      Save as Draft
                    </button>
                    <button className="vap-btn vap-btn--publish" onClick={publish}>
                      Publish Now
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </VendorLayout>
  );
}
