import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { products, categories } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import { FiSliders, FiGrid, FiList } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import './ProductListingPage.css';

export default function ProductListingPage() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  // Filter States
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [priceRange, setPriceRange] = useState(250);
  const [minRating, setMinRating] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);

  // Available filters based on dataset
  const colorsList = ['white', 'beige', 'silver', 'black', 'clear', 'smoke', 'taupe', 'sage', 'cream', 'amber'];

  // Sync category params
  useEffect(() => {
    setSelectedSubcategories([]);
    setCurrentPage(1);
  }, [category]);

  // Filter logic
  const filteredProducts = products.filter(product => {
    // 1. Category Filter
    if (category && category !== 'all' && category !== 'collections' && category !== 'new-arrivals' && category !== 'sustainability') {
      if (product.category !== category) return false;
    }
    // collections, new arrivals, sustainability tags
    if (category === 'new-arrivals' && product.badge !== 'NEW') return false;
    if (category === 'sustainability' && product.brand !== 'Studio Cero' && product.brand !== 'Earth & Home') return false;

    // 2. Search Query Filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) && !product.brand.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // 3. Subcategories Filter
    if (selectedSubcategories.length > 0 && !selectedSubcategories.includes(product.category)) {
      return false;
    }

    // 4. Price Filter
    if (product.price > priceRange) return false;

    // 5. Rating Filter
    if (product.rating < minRating) return false;

    // 6. Color Filter
    if (selectedColor && !product.colors.includes(selectedColor)) return false;

    return true;
  });

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured/default
  });

  // Pagination logic (4 items per page for mockup demonstration)
  const itemsPerPage = 4;
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage) || 1;
  const paginatedProducts = sortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  function handleSubcategoryToggle(sub) {
    setSelectedSubcategories(prev =>
      prev.includes(sub) ? prev.filter(c => c !== sub) : [...prev, sub]
    );
    setCurrentPage(1);
  }

  function handleResetFilters() {
    setSelectedSubcategories([]);
    setPriceRange(300);
    setMinRating(0);
    setSelectedColor(null);
    setSortBy('featured');
    setCurrentPage(1);
  }

  const [showFilters, setShowFilters] = useState(false);
  const categoryTitle = category ? category.replace('-', ' ') : 'Shop All';

  return (
    <div className="product-listing-page container page-content fade-in">
      {/* Breadcrumb */}
      <div className="breadcrumb-wrap">
        <div className="breadcrumb">
          <a href="/home">Home</a>
          <span className="breadcrumb-sep">/</span>
          <a href="/shop/all">Shop All</a>
          {category && (
            <>
              <span className="breadcrumb-sep">/</span>
              <span className="text-primary">{categoryTitle}</span>
            </>
          )}
        </div>
      </div>

      <h1 className="listing-title">{categoryTitle}</h1>
      <p className="listing-subtitle">Curated essentials for your mind, body, and home. Discover sustainable, high-quality products.</p>

      {/* Mobile Filter Toggle */}
      <div className="mobile-filter-bar">
        <button 
          className="btn btn-secondary btn-block mobile-filter-toggle-btn" 
          onClick={() => setShowFilters(!showFilters)}
        >
          <FiSliders size={14} />
          <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
        </button>
      </div>

      <div className="listing-layout">
        {/* Sidebar Filters */}
        <aside className={`filters-sidebar ${showFilters ? 'open' : ''}`}>
          <div className="filter-section-header">
            <h3 className="filter-header-title">Filters</h3>
            <button className="reset-filter-btn" onClick={handleResetFilters}>Clear All</button>
          </div>

          {/* Categories Filter */}
          <div className="filter-group-wrap">
            <h4 className="filter-group-title">Categories</h4>
            <div className="filter-checkbox-list">
              {categories.filter(c => c.id !== 'all').map(cat => (
                <label key={cat.id} className="filter-checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedSubcategories.includes(cat.id)}
                    onChange={() => handleSubcategoryToggle(cat.id)}
                  />
                  <span className="capitalize">{cat.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="filter-group-wrap">
            <h4 className="filter-group-title">Price Range</h4>
            <div className="price-slider-wrap">
              <input
                type="range"
                min="10"
                max="300"
                value={priceRange}
                onChange={e => setPriceRange(Number(e.target.value))}
                className="price-slider"
              />
              <div className="price-values">
                <span>$10</span>
                <span className="current-price-val">${priceRange}</span>
              </div>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="filter-group-wrap">
            <h4 className="filter-group-title">Rating</h4>
            <div className="rating-filter-list">
              {[4, 3, 2].map(stars => (
                <button
                  key={stars}
                  className={`rating-filter-btn ${minRating === stars ? 'active' : ''}`}
                  onClick={() => setMinRating(stars)}
                >
                  <span className="stars">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < stars ? "star" : "star star-empty"} />
                    ))}
                  </span>
                  <span className="rating-filter-text">& Up</span>
                </button>
              ))}
            </div>
          </div>

          {/* Color Filter */}
          <div className="filter-group-wrap">
            <h4 className="filter-group-title">Color</h4>
            <div className="color-swatches-grid">
              {colorsList.map(color => (
                <button
                  key={color}
                  className={`color-swatch-btn color-${color} ${selectedColor === color ? 'active' : ''}`}
                  onClick={() => setSelectedColor(prev => prev === color ? null : color)}
                  title={color}
                />
              ))}
            </div>
          </div>
        </aside>

        {/* Products Results */}
        <main className="listing-results">
          {/* Controls Bar */}
          <div className="results-controls">
            <span className="results-count">{sortedProducts.length} items found</span>
            
            <div className="controls-actions">
              <div className="sort-wrap">
                <label htmlFor="sort-select">Sort By:</label>
                <select 
                  id="sort-select"
                  value={sortBy} 
                  onChange={e => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              <div className="view-modes">
                <button 
                  className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <FiGrid size={16} />
                </button>
                <button 
                  className={`view-mode-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <FiList size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Listing Grid / List */}
          {paginatedProducts.length > 0 ? (
            <div className={`products-listing-view ${viewMode}-view`}>
              {paginatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>No products found</h3>
              <p>Try resetting filters or checking spelling.</p>
              <button className="btn btn-primary" onClick={handleResetFilters}>Reset Filters</button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                className="pagination-btn" 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                ‹
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button 
                className="pagination-btn" 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                ›
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
