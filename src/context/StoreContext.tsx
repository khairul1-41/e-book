import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  EBookProduct,
  Category,
  Order,
  Review,
  FebspotVideo,
  SpecialOffer,
  Coupon,
  AdsterraConfig,
  SiteSettings
} from '../types';
import {
  fetchProducts,
  fetchCategories,
  fetchOffers,
  fetchCoupons,
  fetchReviews,
  fetchVideos,
  fetchAdsterraConfig,
  fetchSiteSettings,
  saveProduct,
  deleteProduct,
  saveCategory,
  deleteCategory,
  createOrder,
  saveReview,
  deleteReview,
  saveVideo,
  deleteVideo,
  saveOffer,
  deleteOffer,
  saveCoupon,
  deleteCoupon,
  saveAdsterraConfig,
  saveSiteSettings,
  generateSecureEBookBlob
} from '../firebase/dbService';

export interface CartItem {
  product: EBookProduct;
  quantity: number;
}

interface StoreContextType {
  products: EBookProduct[];
  categories: Category[];
  offers: SpecialOffer[];
  coupons: Coupon[];
  reviews: Review[];
  videos: FebspotVideo[];
  adsterra: AdsterraConfig;
  adsterraConfig: AdsterraConfig;
  settings: SiteSettings;
  loading: boolean;
  cart: CartItem[];
  wishlist: string[];
  appliedCoupon: Coupon | null;
  searchQuery: string;
  selectedCategory: string;
  sortBy: string;
  selectedProduct: EBookProduct | null;
  readingBook: EBookProduct | null;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  isAccountOpen: boolean;
  isContactOpen: boolean;
  legalModalType: 'privacy' | 'terms' | 'refund' | 'download' | 'copyright' | null;
  shareProduct: EBookProduct | null;

  // Actions
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: string) => void;
  setSortBy: (sort: string) => void;
  setSelectedProduct: (p: EBookProduct | null) => void;
  setReadingBook: (p: EBookProduct | null) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setIsAccountOpen: (open: boolean) => void;
  setIsContactOpen: (open: boolean) => void;
  setLegalModalType: (type: 'privacy' | 'terms' | 'refund' | 'download' | 'copyright' | null) => void;
  setShareProduct: (p: EBookProduct | null) => void;

  // Cart & Wishlist
  addToCart: (product: EBookProduct) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartTotal: number;

  // Book reader & download
  downloadBookFile: (product: EBookProduct) => void;

  // Store Management Actions (Refreshes state immediately)
  refreshData: () => Promise<void>;
  updateProduct: (product: EBookProduct) => Promise<void>;
  removeProduct: (productId: string) => Promise<void>;
  updateCategory: (category: Category) => Promise<void>;
  removeCategory: (categoryId: string) => Promise<void>;
  updateReview: (review: Review) => Promise<void>;
  removeReview: (reviewId: string) => Promise<void>;
  updateVideo: (video: FebspotVideo) => Promise<void>;
  removeVideo: (videoId: string) => Promise<void>;
  updateOffer: (offer: SpecialOffer) => Promise<void>;
  removeOffer: (offerId: string) => Promise<void>;
  updateCoupon: (coupon: Coupon) => Promise<void>;
  removeCouponItem: (couponId: string) => Promise<void>;
  updateSettings: (settings: SiteSettings) => Promise<void>;
  updateAdsterra: (adsterra: AdsterraConfig) => Promise<void>;
  updateAdsterraConfig: (adsterra: AdsterraConfig) => Promise<void>;
  placeOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Promise<Order>;

  // Formatting helpers
  formatPrice: (amount: number) => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<EBookProduct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [offers, setOffers] = useState<SpecialOffer[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [videos, setVideos] = useState<FebspotVideo[]>([]);
  const [adsterra, setAdsterra] = useState<AdsterraConfig>({
    popunderEnabled: false,
    popunderScript: '',
    socialBarEnabled: false,
    socialBarScript: '',
    banners: []
  });
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: 'Drem Shop',
    tagline: 'অনলাইন ডিজিটাল ই-বুক মার্কেটপ্লেস',
    siteLogoText: 'Drem Shop',
    contactEmail: 'support@dremshop.com',
    contactPhone: '+880 1712-345678',
    whatsappNumber: '+880 1712-345678',
    address: 'Dhaka, Bangladesh',
    facebookUrl: 'https://facebook.com',
    youtubeUrl: 'https://youtube.com',
    currencySymbol: '৳',
    currencyCode: 'BDT',
    announcementBar: { enabled: true, text: 'Welcome to Drem Shop' },
    maintenanceMode: false,
    metaTitle: 'Drem Shop',
    metaDescription: 'E-Book marketplace',
    metaKeywords: 'ebook, digital'
  });
  const [loading, setLoading] = useState(true);

  // Cart & Wishlist in localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('dremshop_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dremshop_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  // Modals
  const [selectedProduct, setSelectedProduct] = useState<EBookProduct | null>(null);
  const [readingBook, setReadingBook] = useState<EBookProduct | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'refund' | 'download' | 'copyright' | null>(null);
  const [shareProduct, setShareProduct] = useState<EBookProduct | null>(null);

  const refreshData = async () => {
    try {
      const [p, c, o, cp, r, v, ad, s] = await Promise.all([
        fetchProducts(),
        fetchCategories(),
        fetchOffers(),
        fetchCoupons(),
        fetchReviews(),
        fetchVideos(),
        fetchAdsterraConfig(),
        fetchSiteSettings()
      ]);
      setProducts(p);
      setCategories(c);
      setOffers(o);
      setCoupons(cp);
      setReviews(r);
      setVideos(v);
      setAdsterra(ad);
      setSettings(s);
    } catch (e) {
      console.error('Error refreshing data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    localStorage.setItem('dremshop_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('dremshop_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Cart operations
  const addToCart = (product: EBookProduct) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        // Digital book: 1 copy is usually sufficient, but we notify user
        return prev;
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => {
    const unitPrice = item.product.discountPrice ?? item.product.price;
    return sum + unitPrice * item.quantity;
  }, 0);

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const trimmed = code.trim().toUpperCase();
    const found = coupons.find(c => c.code.toUpperCase() === trimmed && c.isActive);
    if (!found) {
      return { success: false, message: 'Invalid or inactive coupon code.' };
    }
    if (found.minSpend && cartSubtotal < found.minSpend) {
      return {
        success: false,
        message: `Minimum spend of ${settings.currencySymbol}${found.minSpend} required for this coupon.`
      };
    }
    setAppliedCoupon(found);
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  let cartDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      cartDiscount = Math.round((cartSubtotal * appliedCoupon.discountValue) / 100);
      if (appliedCoupon.maxDiscount && cartDiscount > appliedCoupon.maxDiscount) {
        cartDiscount = appliedCoupon.maxDiscount;
      }
    } else {
      cartDiscount = appliedCoupon.discountValue;
    }
  }

  const cartTotal = Math.max(0, cartSubtotal - cartDiscount);

  // Secure download action
  const downloadBookFile = (product: EBookProduct) => {
    const blob = generateSecureEBookBlob(product);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const safeTitle = product.title.replace(/[^a-zA-Z0-9\u0980-\u09FF]/g, '_');
    a.download = `DremShop_${safeTitle}.${product.fileFormat.toLowerCase()}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Order placement
  const placeOrder = async (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Promise<Order> => {
    const timestamp = Date.now();
    const orderNumber = `DS-${new Date().toISOString().slice(2, 10).replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${timestamp}`,
      orderNumber,
      createdAt: new Date().toISOString()
    };
    await createOrder(newOrder);
    clearCart();
    return newOrder;
  };

  // Helper formatting
  const formatPrice = (amount: number) => {
    return `${settings.currencySymbol}${amount.toLocaleString('en-US')}`;
  };

  // Admin and mutation wrappers
  const updateProduct = async (product: EBookProduct) => {
    await saveProduct(product);
    await refreshData();
  };

  const removeProduct = async (productId: string) => {
    await deleteProduct(productId);
    await refreshData();
  };

  const updateCategory = async (cat: Category) => {
    await saveCategory(cat);
    await refreshData();
  };

  const removeCategory = async (catId: string) => {
    await deleteCategory(catId);
    await refreshData();
  };

  const updateReview = async (rev: Review) => {
    await saveReview(rev);
    await refreshData();
  };

  const removeReview = async (revId: string) => {
    await deleteReview(revId);
    await refreshData();
  };

  const updateVideo = async (vid: FebspotVideo) => {
    await saveVideo(vid);
    await refreshData();
  };

  const removeVideo = async (vidId: string) => {
    await deleteVideo(vidId);
    await refreshData();
  };

  const updateOffer = async (off: SpecialOffer) => {
    await saveOffer(off);
    await refreshData();
  };

  const removeOffer = async (offId: string) => {
    await deleteOffer(offId);
    await refreshData();
  };

  const updateCoupon = async (cp: Coupon) => {
    await saveCoupon(cp);
    await refreshData();
  };

  const removeCouponItem = async (cpId: string) => {
    await deleteCoupon(cpId);
    await refreshData();
  };

  const updateSettings = async (set: SiteSettings) => {
    await saveSiteSettings(set);
    await refreshData();
  };

  const updateAdsterra = async (ad: AdsterraConfig) => {
    await saveAdsterraConfig(ad);
    await refreshData();
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        offers,
        coupons,
        reviews,
        videos,
        adsterra,
        settings,
        loading,
        cart,
        wishlist,
        appliedCoupon,
        searchQuery,
        selectedCategory,
        sortBy,
        selectedProduct,
        readingBook,
        isCartOpen,
        isCheckoutOpen,
        isAccountOpen,
        isContactOpen,
        legalModalType,
        shareProduct,
        setSearchQuery,
        setSelectedCategory,
        setSortBy,
        setSelectedProduct,
        setReadingBook,
        setIsCartOpen,
        setIsCheckoutOpen,
        setIsAccountOpen,
        setIsContactOpen,
        setLegalModalType,
        setShareProduct,
        addToCart,
        removeFromCart,
        clearCart,
        toggleWishlist,
        applyCoupon,
        removeCoupon,
        cartSubtotal,
        cartDiscount,
        cartTotal,
        downloadBookFile,
        refreshData,
        updateProduct,
        removeProduct,
        updateCategory,
        removeCategory,
        updateReview,
        removeReview,
        updateVideo,
        removeVideo,
        updateOffer,
        removeOffer,
        updateCoupon,
        removeCouponItem,
        updateSettings,
        updateAdsterra,
        adsterraConfig: adsterra,
        updateAdsterraConfig: updateAdsterra,
        placeOrder,
        formatPrice
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
