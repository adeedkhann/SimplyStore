import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Customer Pages
import SplashPage from './pages/SplashPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import OrderReturnPage from './pages/OrderReturnPage';
import AccountPage from './pages/AccountPage';
import WishlistPage from './pages/WishlistPage';
import InfoPage from './pages/InfoPage';

// Vendor Portal Pages
import VendorDashboardPage from './pages/vendor/VendorDashboardPage';
import VendorProductsPage from './pages/vendor/VendorProductsPage';
import VendorAddProductPage from './pages/vendor/VendorAddProductPage';
import VendorOrdersPage from './pages/vendor/VendorOrdersPage';
import VendorPayoutsPage from './pages/vendor/VendorPayoutsPage';
import VendorSettingsPage from './pages/vendor/VendorSettingsPage';

// Admin Dashboard Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminVendorsPage from './pages/admin/AdminVendorsPage';
import AdminVendorDetailPage from './pages/admin/AdminVendorDetailPage';
import AdminCustomersPage from './pages/admin/AdminCustomersPage';
import AdminReturnsPage from './pages/admin/AdminReturnsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

function StoreLayout({ children }) {
  const location = useLocation();
  const hideNavFooter = ['/', '/login'].includes(location.pathname);

  return (
    <div className="page-wrapper">
      {!hideNavFooter && <Navbar />}
      <main className={hideNavFooter ? '' : 'page-content'}>
        {children}
      </main>
      {!hideNavFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* ── Splash & Auth ── */}
            <Route path="/" element={<SplashPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* ── Customer Storefront ── */}
            <Route path="/home" element={<StoreLayout><HomePage /></StoreLayout>} />
            <Route path="/shop/:category" element={<StoreLayout><ProductListingPage /></StoreLayout>} />
            <Route path="/product/:id" element={<StoreLayout><ProductDetailPage /></StoreLayout>} />
            <Route path="/cart" element={<StoreLayout><CartPage /></StoreLayout>} />
            <Route path="/orders" element={<StoreLayout><OrdersPage /></StoreLayout>} />
            <Route path="/orders/:id/track" element={<StoreLayout><OrderTrackingPage /></StoreLayout>} />
            <Route path="/orders/:id/return" element={<StoreLayout><OrderReturnPage /></StoreLayout>} />
            <Route path="/account" element={<StoreLayout><AccountPage /></StoreLayout>} />
            <Route path="/wishlist" element={<StoreLayout><WishlistPage /></StoreLayout>} />
            <Route path="/privacy" element={<StoreLayout><InfoPage /></StoreLayout>} />
            <Route path="/terms" element={<StoreLayout><InfoPage /></StoreLayout>} />
            <Route path="/shipping" element={<StoreLayout><InfoPage /></StoreLayout>} />
            <Route path="/contact" element={<StoreLayout><InfoPage /></StoreLayout>} />

            {/* ── Vendor Portal ── */}
            <Route path="/vendor/dashboard" element={<VendorDashboardPage />} />
            <Route path="/vendor/products" element={<VendorProductsPage />} />
            <Route path="/vendor/products/add" element={<VendorAddProductPage />} />
            <Route path="/vendor/products/edit/:id" element={<VendorAddProductPage />} />
            <Route path="/vendor/orders" element={<VendorOrdersPage />} />
            <Route path="/vendor/payouts" element={<VendorPayoutsPage />} />
            <Route path="/vendor/settings" element={<VendorSettingsPage />} />

            {/* ── Admin Dashboard ── */}
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/vendors" element={<AdminVendorsPage />} />
            <Route path="/admin/vendors/:id" element={<AdminVendorDetailPage />} />
            <Route path="/admin/customers" element={<AdminCustomersPage />} />
            <Route path="/admin/returns" element={<AdminReturnsPage />} />
            <Route path="/admin/settings" element={<AdminSettingsPage />} />

            {/* ── Fallback ── */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
