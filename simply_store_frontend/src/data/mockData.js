// Mock data for Simply Store e-commerce app

export const categories = [
  { id: 'all', name: 'All', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop' },
  { id: 'living', name: 'Living', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop' },
  { id: 'dining', name: 'Dining', image: 'https://images.unsplash.com/photo-1490750967868-88df5691cc45?w=200&h=200&fit=crop' },
  { id: 'wellness', name: 'Wellness', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200&h=200&fit=crop' },
  { id: 'workspace', name: 'Workspace', image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=200&h=200&fit=crop' },
  { id: 'textiles', name: 'Textiles', image: 'https://images.unsplash.com/photo-1617529497471-9218633199c0?w=200&h=200&fit=crop' },
];

export const products = [
  {
    id: 1,
    name: 'Organic Sculptural Vase',
    brand: 'Studio Cero',
    category: 'living',
    price: 85,
    originalPrice: null,
    badge: null,
    rating: 4.8,
    reviews: 243,
    image: 'https://images.unsplash.com/photo-1612690835628-5e62a5c2c0ad?w=400&h=400&fit=crop',
    colors: ['white', 'beige'],
    description: 'Handcrafted from sustainable materials, this sculptural vase adds organic beauty to any space.',
    inStock: true,
  },
  {
    id: 2,
    name: 'Linear Desk Lamp',
    brand: 'LumaTech',
    category: 'workspace',
    price: 145,
    originalPrice: null,
    badge: 'BEST SELLER',
    rating: 4.9,
    reviews: 512,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    colors: ['silver', 'black'],
    description: 'Brushed aluminum minimalist desk lamp with adjustable color temperature.',
    inStock: true,
  },
  {
    id: 3,
    name: 'Essential Tumbler Set',
    brand: 'Earth & Home',
    category: 'dining',
    price: 40,
    originalPrice: null,
    badge: null,
    rating: 4.6,
    reviews: 91,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop',
    colors: ['clear', 'smoke'],
    description: 'Set of 4 handblown clear glass tumblers. Timeless design for everyday use.',
    inStock: false,
  },
  {
    id: 4,
    name: 'Cashmere Blend Throw',
    brand: 'Soft Living',
    category: 'textiles',
    price: 195,
    originalPrice: null,
    badge: 'LOW STOCK',
    rating: 5.0,
    reviews: 178,
    image: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=400&h=400&fit=crop',
    colors: ['taupe', 'sage', 'cream'],
    description: 'Warm taupe cashmere blend throw, perfect for cozy evenings.',
    inStock: true,
  },
  {
    id: 5,
    name: 'Ultrasonic Mist Diffuser',
    brand: 'Aura Botanica',
    category: 'wellness',
    price: 85,
    originalPrice: null,
    badge: 'NEW',
    rating: 4.7,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop',
    colors: ['matte-white', 'amber'],
    description: 'Ultrasonic mist diffuser with ambient glow. Runs up to 10 hours.',
    inStock: true,
  },
  {
    id: 6,
    name: 'Organic Cotton Towel Set',
    brand: 'Earth & Home',
    category: 'textiles',
    price: 45,
    originalPrice: 60,
    badge: 'SALE',
    rating: 4.5,
    reviews: 64,
    image: 'https://images.unsplash.com/photo-1616627561839-074385245ff6?w=400&h=400&fit=crop',
    colors: ['sage', 'sand', 'white'],
    description: 'Set of 6 GOTS-certified organic cotton towels in sage green.',
    inStock: true,
  },
  {
    id: 7,
    name: 'Ergonomic Wireless Mouse',
    brand: 'Office Essentials',
    category: 'workspace',
    price: 89,
    originalPrice: null,
    badge: null,
    rating: 4.6,
    reviews: 329,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
    colors: ['slate-grey', 'white'],
    description: 'Ergonomic wireless mouse with 90-day battery life.',
    inStock: true,
  },
  {
    id: 8,
    name: 'Aluminum Laptop Stand',
    brand: 'Desk Gear',
    category: 'workspace',
    price: 65,
    originalPrice: null,
    badge: null,
    rating: 4.8,
    reviews: 215,
    image: 'https://images.unsplash.com/photo-1593642634367-d91a135587b5?w=400&h=400&fit=crop',
    colors: ['silver'],
    description: 'Adjustable height aluminum laptop stand. Compatible with all laptops 11–17".',
    inStock: true,
  },
  {
    id: 9,
    name: 'Ceramic Pour Over Set',
    brand: 'Morning Ritual',
    category: 'dining',
    price: 75,
    originalPrice: 95,
    badge: 'SALE',
    rating: 4.9,
    reviews: 87,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop',
    colors: ['cream', 'charcoal'],
    description: 'Hand-thrown ceramic pour over coffee set with wooden handle.',
    inStock: true,
  },
  {
    id: 10,
    name: 'Linen Cushion Cover Set',
    brand: 'Woven Stories',
    category: 'living',
    price: 55,
    originalPrice: null,
    badge: 'NEW',
    rating: 4.4,
    reviews: 43,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
    colors: ['ivory', 'dusty-rose', 'slate'],
    description: 'Set of 2 stonewashed linen cushion covers in natural ivory.',
    inStock: true,
  },
  {
    id: 11,
    name: 'Premium Noise-Cancelling Headphones',
    brand: 'Simply Tech',
    category: 'workspace',
    price: 299,
    originalPrice: null,
    badge: 'BEST SELLER',
    rating: 4.9,
    reviews: 1024,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    colors: ['matte-black', 'silver'],
    description: 'Over-ear premium noise-cancelling headphones with 40h battery.',
    inStock: true,
  },
  {
    id: 12,
    name: 'Marble Cheese Board Set',
    brand: 'Table & Gather',
    category: 'dining',
    price: 120,
    originalPrice: 150,
    badge: 'SALE',
    rating: 4.7,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    colors: ['white-marble', 'black-marble'],
    description: 'Rectangular marble cheese board with 4 stainless steel utensils.',
    inStock: true,
  },
];

export const wellnessProducts = products.filter(p => p.category === 'wellness');

export const orders = [
  {
    id: '112-9876543-123456',
    date: 'Oct 24, 2023',
    total: 299.00,
    shipTo: 'Jane Doe',
    status: 'delivered',
    statusLabel: 'Delivered Oct 26',
    statusNote: 'Your package was left near the front door.',
    items: [
      {
        id: 11,
        name: 'Premium Noise-Cancelling Headphones, Over-Ear, Matte Black',
        brand: 'Simply Tech',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
      }
    ],
    actions: ['Track Package', 'Return or Replace', 'Write a Product Review'],
  },
  {
    id: '113-5551234-987654',
    date: 'Nov 02, 2023',
    total: 85.50,
    shipTo: 'Jane Doe',
    status: 'in-transit',
    statusLabel: 'Arriving Tomorrow by 8 PM',
    statusNote: '',
    items: [
      {
        id: 7,
        name: 'Ergonomic Wireless Mouse, Slate Grey',
        brand: 'Office Essentials',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop',
      },
      {
        id: 8,
        name: 'Aluminum Laptop Stand, Adjustable Height',
        brand: 'Desk Gear',
        image: 'https://images.unsplash.com/photo-1593642634367-d91a135587b5?w=100&h=100&fit=crop',
      }
    ],
    actions: ['Track Package', 'Cancel Items'],
  },
  {
    id: '114-2223344-556677',
    date: 'Nov 15, 2023',
    total: 195.00,
    shipTo: 'Jane Doe',
    status: 'not-shipped',
    statusLabel: 'Not Yet Shipped',
    statusNote: 'Order is being processed.',
    items: [
      {
        id: 4,
        name: 'Cashmere Blend Throw, Warm Taupe',
        brand: 'Soft Living',
        image: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=100&h=100&fit=crop',
      }
    ],
    actions: ['Cancel Order'],
  },
];

export const trackingData = {
  orderId: '#SS-92834',
  status: 'Out for Delivery',
  estimatedArrival: 'Today, Oct 25',
  estimatedTime: 'by 5:00 PM',
  steps: [
    { label: 'Order Placed', date: 'Oct 22', time: '9:00 AM', status: 'done' },
    { label: 'Processed', date: 'Oct 23', time: '2:15 PM', status: 'done' },
    { label: 'Shipped', date: 'Oct 24', time: '8:30 AM', status: 'done' },
    { label: 'Out for Delivery', date: 'Today', time: '8:00 AM', status: 'active' },
    { label: 'Delivered', date: '', time: 'Pending', status: 'pending' },
  ],
  delivery: {
    address: '123 Design Avenue, Suite 404, San Francisco, CA 94107',
    courier: 'FedEx Express',
    trackingId: 'FX-9928-4482',
  }
};

export const cartItems = [
  {
    id: 5,
    name: 'Ultrasonic Mist Diffuser',
    brand: 'Aura Botanica',
    color: 'Matte White',
    price: 45,
    qty: 1,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=120&h=120&fit=crop',
  },
  {
    id: 6,
    name: 'Organic Cotton Towels',
    brand: 'Earth & Home',
    color: 'Sage',
    size: 'Bath Sheet',
    price: 80,
    qty: 2,
    image: 'https://images.unsplash.com/photo-1616627561839-074385245ff6?w=120&h=120&fit=crop',
  }
];

// =====================
// VENDOR PORTAL DATA
// =====================

export const vendors = [
  { id: 'v1', name: 'TechVision Co.', owner: 'Arjun Mehta', email: 'arjun@techvision.com', phone: '+1 415 555 0101', location: 'San Francisco, CA', joinDate: 'Mar 12, 2023', status: 'active', products: 48, revenue: 28400, logo: 'TV', category: 'Electronics' },
  { id: 'v2', name: 'Earth & Home', owner: 'Priya Sharma', email: 'priya@earthhome.com', phone: '+1 212 555 0202', location: 'New York, NY', joinDate: 'Jan 5, 2023', status: 'active', products: 31, revenue: 19200, logo: 'EH', category: 'Home & Living' },
  { id: 'v3', name: 'Soft Living Co.', owner: 'Emily Chen', email: 'emily@softliving.com', phone: '+1 310 555 0303', location: 'Los Angeles, CA', joinDate: 'May 20, 2023', status: 'active', products: 24, revenue: 15700, logo: 'SL', category: 'Textiles' },
  { id: 'v4', name: 'Morning Ritual', owner: 'James Park', email: 'james@morningritual.com', phone: '+1 512 555 0404', location: 'Austin, TX', joinDate: 'Jul 8, 2023', status: 'pending', products: 12, revenue: 0, logo: 'MR', category: 'Dining' },
  { id: 'v5', name: 'Aura Botanica', owner: 'Sofia Reyes', email: 'sofia@aurabotanica.com', phone: '+1 305 555 0505', location: 'Miami, FL', joinDate: 'Aug 14, 2023', status: 'pending', products: 8, revenue: 0, logo: 'AB', category: 'Wellness' },
  { id: 'v6', name: 'Desk Gear Pro', owner: 'Kevin Tran', email: 'kevin@deskgear.com', phone: '+1 206 555 0606', location: 'Seattle, WA', joinDate: 'Sep 1, 2023', status: 'active', products: 19, revenue: 11300, logo: 'DG', category: 'Workspace' },
  { id: 'v7', name: 'Studio Cero', owner: 'Luca Ferri', email: 'luca@studiocero.com', phone: '+1 415 555 0707', location: 'San Francisco, CA', joinDate: 'Feb 22, 2023', status: 'active', products: 9, revenue: 7800, logo: 'SC', category: 'Living' },
  { id: 'v8', name: 'Table & Gather', owner: 'Maria Dubois', email: 'maria@tableandgather.com', phone: '+1 617 555 0808', location: 'Boston, MA', joinDate: 'Oct 3, 2023', status: 'suspended', products: 15, revenue: 4200, logo: 'TG', category: 'Dining' },
];

export const vendorProducts = [
  { id: 'vp1', name: 'Premium Noise-Cancelling Headphones', sku: 'TC-HP-001', category: 'Electronics', price: 299, stock: 45, status: 'active', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=60&h=60&fit=crop' },
  { id: 'vp2', name: 'Wireless Bluetooth Speaker', sku: 'TC-SP-002', category: 'Electronics', price: 149, stock: 7, status: 'active', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=60&h=60&fit=crop' },
  { id: 'vp3', name: 'Smart LED Desk Lamp', sku: 'TC-LM-003', category: 'Electronics', price: 89, stock: 0, status: 'out-of-stock', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=60&h=60&fit=crop' },
  { id: 'vp4', name: 'Mechanical Keyboard', sku: 'TC-KB-004', category: 'Electronics', price: 189, stock: 23, status: 'active', image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=60&h=60&fit=crop' },
  { id: 'vp5', name: '4K Webcam Pro', sku: 'TC-WC-005', category: 'Electronics', price: 219, stock: 4, status: 'active', image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=60&h=60&fit=crop' },
  { id: 'vp6', name: 'USB-C Hub 8-in-1', sku: 'TC-HB-006', category: 'Electronics', price: 59, stock: 88, status: 'active', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=60&h=60&fit=crop' },
  { id: 'vp7', name: 'Ergonomic Mouse Pad XL', sku: 'TC-MP-007', category: 'Workspace', price: 35, stock: 0, status: 'draft', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=60&h=60&fit=crop' },
  { id: 'vp8', name: 'Cable Management Kit', sku: 'TC-CM-008', category: 'Workspace', price: 25, stock: 112, status: 'active', image: 'https://images.unsplash.com/photo-1593642634367-d91a135587b5?w=60&h=60&fit=crop' },
];

export const vendorOrders = [
  { id: 'VO-1001', customer: 'Customer #4821', date: 'Nov 14, 2023', items: [{ name: 'Premium Headphones', qty: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=50&h=50&fit=crop' }], total: 299, status: 'new', tracking: '' },
  { id: 'VO-1002', customer: 'Customer #3347', date: 'Nov 13, 2023', items: [{ name: 'Bluetooth Speaker', qty: 2, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=50&h=50&fit=crop' }], total: 298, status: 'ready', tracking: '' },
  { id: 'VO-1003', customer: 'Customer #7781', date: 'Nov 10, 2023', items: [{ name: 'Mechanical Keyboard', qty: 1, image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=50&h=50&fit=crop' }], total: 189, status: 'shipped', tracking: 'FX-9928-4482' },
  { id: 'VO-1004', customer: 'Customer #2294', date: 'Nov 6, 2023', items: [{ name: 'USB-C Hub', qty: 3, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=50&h=50&fit=crop' }], total: 177, status: 'delivered', tracking: 'UPS-1234-5678' },
  { id: 'VO-1005', customer: 'Customer #9103', date: 'Oct 28, 2023', items: [{ name: 'Premium Headphones', qty: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=50&h=50&fit=crop' }], total: 299, status: 'return', tracking: '', returnReason: 'Product stopped working after 2 days', returnType: 'Replace' },
];

export const vendorPayouts = [
  { id: 'PO-5001', date: 'Nov 1, 2023', amount: 4200, method: 'Bank Transfer', status: 'paid', ref: 'TXN-8821-4401' },
  { id: 'PO-5002', date: 'Oct 1, 2023', amount: 3800, method: 'Bank Transfer', status: 'paid', ref: 'TXN-7732-3312' },
  { id: 'PO-5003', date: 'Sep 1, 2023', amount: 5100, method: 'Bank Transfer', status: 'paid', ref: 'TXN-6543-2203' },
  { id: 'PO-5004', date: 'Aug 1, 2023', amount: 2900, method: 'Bank Transfer', status: 'paid', ref: 'TXN-5454-1124' },
  { id: 'PO-5005', date: 'Jul 1, 2023', amount: 3200, method: 'Bank Transfer', status: 'processing', ref: 'TXN-4365-0045' },
  { id: 'PO-5006', date: 'Jun 1, 2023', amount: 1800, method: 'Bank Transfer', status: 'paid', ref: 'TXN-3276-9956' },
];

// =====================
// ADMIN DASHBOARD DATA
// =====================

export const adminCustomers = [
  { id: 'c1', name: 'Jane Doe', email: 'jane.doe@example.com', joinDate: 'Mar 2022', orders: 24, spent: 3420, status: 'active', avatar: 'JD' },
  { id: 'c2', name: 'Michael Torres', email: 'm.torres@email.com', joinDate: 'Jul 2022', orders: 11, spent: 1290, status: 'active', avatar: 'MT' },
  { id: 'c3', name: 'Anita Patel', email: 'anita.p@gmail.com', joinDate: 'Sep 2022', orders: 7, spent: 890, status: 'active', avatar: 'AP' },
  { id: 'c4', name: 'Ryan Kowalski', email: 'ryan.k@outlook.com', joinDate: 'Nov 2022', orders: 31, spent: 5200, status: 'active', avatar: 'RK' },
  { id: 'c5', name: 'Chloe Nguyen', email: 'chloe.n@yahoo.com', joinDate: 'Jan 2023', orders: 2, spent: 145, status: 'banned', avatar: 'CN' },
  { id: 'c6', name: 'David Kim', email: 'david.kim@email.com', joinDate: 'Feb 2023', orders: 18, spent: 2730, status: 'active', avatar: 'DK' },
  { id: 'c7', name: "Sarah O'Brien", email: 'sarah.o@work.com', joinDate: 'Apr 2023', orders: 5, spent: 670, status: 'active', avatar: 'SO' },
  { id: 'c8', name: 'Omar Hassan', email: 'omar.h@email.com', joinDate: 'Jun 2023', orders: 9, spent: 1100, status: 'active', avatar: 'OH' },
  { id: 'c9', name: 'Lisa Tran', email: 'lisa.tran@gmail.com', joinDate: 'Aug 2023', orders: 3, spent: 320, status: 'active', avatar: 'LT' },
  { id: 'c10', name: 'Marcus Bell', email: 'marcus.b@email.com', joinDate: 'Oct 2023', orders: 1, spent: 89, status: 'banned', avatar: 'MB' },
];

export const returnRequests = [
  { id: 'R-4521', customer: 'Jane Doe', product: 'Premium Noise-Cancelling Headphones', vendor: 'TechVision Co.', type: 'Replace', date: 'Nov 12, 2023', status: 'pending', reason: 'Product stopped working after 2 days of use. No power when charged.', productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&h=120&fit=crop' },
  { id: 'R-4520', customer: 'Michael Torres', product: 'Cashmere Blend Throw', vendor: 'Soft Living Co.', type: 'Return', date: 'Nov 10, 2023', status: 'approved', reason: 'Color looks different from the website photos. Not what I expected.', productImage: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=120&h=120&fit=crop' },
  { id: 'R-4519', customer: 'Anita Patel', product: 'Essential Tumbler Set', vendor: 'Earth & Home', type: 'Return', date: 'Nov 9, 2023', status: 'rejected', reason: 'One of the tumblers arrived cracked.', productImage: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=120&h=120&fit=crop' },
  { id: 'R-4518', customer: 'Ryan Kowalski', product: 'Organic Sculptural Vase', vendor: 'Studio Cero', type: 'Replace', date: 'Nov 7, 2023', status: 'pending', reason: 'Package arrived with the vase completely shattered inside.', productImage: 'https://images.unsplash.com/photo-1612690835628-5e62a5c2c0ad?w=120&h=120&fit=crop' },
  { id: 'R-4517', customer: 'David Kim', product: 'Linear Desk Lamp', vendor: 'TechVision Co.', type: 'Return', date: 'Nov 5, 2023', status: 'approved', reason: 'Light flickers at all brightness levels. Defective unit.', productImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=120&h=120&fit=crop' },
  { id: 'R-4516', customer: "Sarah O'Brien", product: 'Marble Cheese Board Set', vendor: 'Table & Gather', type: 'Replace', date: 'Nov 3, 2023', status: 'pending', reason: 'Missing 2 of the 4 utensils from the set.', productImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop' },
];

export const adminRevenueChart = [
  { month: 'Jun', value: 180000 },
  { month: 'Jul', value: 220000 },
  { month: 'Aug', value: 195000 },
  { month: 'Sep', value: 310000 },
  { month: 'Oct', value: 280000 },
  { month: 'Nov', value: 415000 },
];

export const vendorRevenueChart = [
  { month: 'Jun', value: 4200 },
  { month: 'Jul', value: 5800 },
  { month: 'Aug', value: 4900 },
  { month: 'Sep', value: 7100 },
  { month: 'Oct', value: 6400 },
  { month: 'Nov', value: 9300 },
];
