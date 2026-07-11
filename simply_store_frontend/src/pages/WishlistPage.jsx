import { useCart } from '../context/CartContext';
import { products } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import './WishlistPage.css';

export default function WishlistPage() {
  const { wishlist } = useCart();

  const wishlistedItems = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="wishlist-page container page-content fade-in">
      <h1 className="wishlist-title">My Wishlist</h1>
      <p className="wishlist-subtitle">Save items you love to shop later.</p>

      {wishlistedItems.length > 0 ? (
        <div className="products-grid">
          {wishlistedItems.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-wishlist text-center">
          <h2>No items in wishlist</h2>
          <p>Tap the heart icon on any product to save it here.</p>
        </div>
      )}
    </div>
  );
}
