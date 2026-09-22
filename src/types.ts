export type UserRole = 'super_admin' | 'manager' | 'editor' | 'customer';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  phone?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
  purchasedBooks?: string[]; // array of product IDs
  purchasedBookIds?: string[]; // alias
  downloadCount?: number;
}

export interface EBookProduct {
  id: string;
  title: string;
  author: string;
  category: string;
  subCategory?: string;
  description: string;
  shortDescription: string;
  price: number;
  discountPrice?: number;
  discountPercentage?: number;
  coverImage: string;
  previewImages?: string[];
  sampleChapters?: { title: string; content: string }[];
  fileUrl?: string; // Digital secure download URL or data
  downloadUrl?: string;
  fileFormat: 'PDF' | 'EPUB' | 'MOBI' | 'ZIP' | 'PDF + EPUB';
  fileSize: string; // e.g. "8.4 MB"
  publisher?: string;
  publicationDate?: string;
  language: string; // e.g. "বাংলা", "English"
  pages: number;
  isbn?: string;
  tags?: string[];
  isFeatured: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  isSpecialOffer: boolean;
  isActive?: boolean;
  visibility?: 'published' | 'draft' | 'archived';
  stockStatus?: 'available' | 'coming_soon';
  salesCount: number;
  rating: number;
  reviewCount: number;
  febspotVideoUrl?: string;
  febspotVideoTitle?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  banglaName: string;
  slug: string;
  description?: string;
  iconName?: string;
  image?: string;
  isActive: boolean;
  order: number;
  productCount?: number;
}

export type OrderStatus = 'pending' | 'processing' | 'paid' | 'completed' | 'cancelled' | 'refunded';

export type PaymentMethod = 'bkash' | 'nagad' | 'rocket' | 'card' | 'bank' | 'sandbox' | 'sandbox_test';

export interface OrderItem {
  productId: string;
  title: string;
  productTitle?: string; // alias
  author?: string;
  price: number;
  coverImage?: string;
  fileFormat?: string;
  fileSize?: string;
  downloadUrl?: string;
  downloadAccessGranted?: boolean;
  quantity?: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal?: number;
  discountAmount?: number;
  couponCode?: string;
  totalAmount?: number;
  total?: number; // alias
  paymentMethod: PaymentMethod;
  paymentStatus: 'unpaid' | 'paid' | 'pending' | 'refunded';
  transactionId?: string;
  orderStatus: OrderStatus;
  notes?: string;
  createdAt: string;
  completedAt?: string;
}

export interface Review {
  id: string;
  productId: string;
  productTitle?: string;
  userId: string;
  userName: string;
  userEmail?: string;
  rating: number; // 1 to 5
  comment: string;
  isVerifiedPurchase: boolean;
  status: 'approved' | 'pending' | 'hidden' | 'rejected';
  isFeatured: boolean;
  createdAt: string;
}

export interface FebspotVideo {
  id: string;
  title: string;
  description?: string;
  febspotUrl?: string;
  videoUrl?: string;
  embedUrl?: string;
  embedCode?: string;
  thumbnailUrl?: string;
  attachedProductId?: string;
  relatedProductId?: string;
  productTitle?: string;
  duration?: string;
  views?: number;
  isActive: boolean;
  createdAt: string;
}

export interface SpecialOffer {
  id: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  targetCategory?: string;
  targetProductId?: string;
  startDate: string;
  endDate: string; // ISO date for countdown
  isActive: boolean;
  bannerImage?: string;
  badgeText: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minSpend?: number;
  maxDiscount?: number;
  description?: string;
  validUntil?: string;
  expiresAt?: string;
  usageLimit?: number;
  usedCount?: number;
  isActive: boolean;
}

export interface AdBannerUnit {
  id: string;
  placement: 'header' | 'homepage' | 'product_page' | 'sidebar' | 'between_products' | 'footer';
  title?: string;
  enabled: boolean;
  size: string;
  htmlCode?: string;
  code?: string;
  imageUrl?: string;
  targetUrl?: string;
}

export interface AdsterraConfig {
  popunderEnabled?: boolean;
  popunderScript?: string;
  popunder?: {
    enabled: boolean;
    scriptCode: string;
  };
  socialBarEnabled?: boolean;
  socialBarScript?: string;
  socialBar?: {
    enabled: boolean;
    scriptCode: string;
  };
  banners: AdBannerUnit[];
}

export interface ActivityLog {
  id: string;
  actorName: string;
  actorEmail: string;
  actorRole: UserRole;
  action: string;
  details: string;
  targetId?: string;
  timestamp: string;
}

export interface SiteSettings {
  siteName: string;
  tagline?: string;
  siteTagline?: string;
  siteLogoText?: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  address: string;
  facebookUrl: string;
  youtubeUrl: string;
  febspotChannelUrl?: string;
  currencySymbol: string; // e.g. "৳" or "$"
  currencyCode: string;   // e.g. "BDT" or "USD"
  announcementBar?: {
    enabled: boolean;
    text: string;
    link?: string;
    badge?: string;
  };
  announcementBarText?: string;
  announcementBarEnabled?: boolean;
  maintenanceMode: boolean;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  firebaseConfig?: {
    apiKey?: string;
    authDomain?: string;
    projectId?: string;
    storageBucket?: string;
    messagingSenderId?: string;
    appId?: string;
  };
}
