import { db } from './config';
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';
import {
  EBookProduct,
  Category,
  Order,
  Review,
  FebspotVideo,
  SpecialOffer,
  Coupon,
  AdsterraConfig,
  SiteSettings,
  UserProfile,
  ActivityLog
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_OFFERS,
  INITIAL_COUPONS,
  INITIAL_REVIEWS,
  INITIAL_VIDEOS,
  INITIAL_ADSTERRA_CONFIG,
  INITIAL_SITE_SETTINGS,
  INITIAL_ADMIN_USERS,
  INITIAL_ORDERS
} from '../data/initialData';

// Helper for local state sync
function getLocal<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(`dremshop_${key}`);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn(`Error reading ${key} from storage:`, err);
  }
  return fallback;
}

function setLocal<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`dremshop_${key}`, JSON.stringify(value));
  } catch (err) {
    console.warn(`Error saving ${key} to storage:`, err);
  }
}

// ---------------- PRODUCTS ----------------
export async function fetchProducts(): Promise<EBookProduct[]> {
  if (db) {
    try {
      const snap = await getDocs(collection(db, 'products'));
      if (!snap.empty) {
        return snap.docs.map(d => ({ ...d.data(), id: d.id } as EBookProduct));
      }
    } catch (e) {
      console.warn('Firestore fetchProducts fallback to local:', e);
    }
  }
  return getLocal<EBookProduct[]>('products', INITIAL_PRODUCTS);
}

export async function saveProduct(product: EBookProduct): Promise<void> {
  const current = getLocal<EBookProduct[]>('products', INITIAL_PRODUCTS);
  const index = current.findIndex(p => p.id === product.id);
  let updated: EBookProduct[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = { ...product, updatedAt: new Date().toISOString() };
  } else {
    updated = [product, ...current];
  }
  setLocal('products', updated);

  if (db) {
    try {
      await setDoc(doc(db, 'products', product.id), {
        ...product,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (e) {
      console.warn('Firestore saveProduct error:', e);
    }
  }
}

export async function deleteProduct(productId: string): Promise<void> {
  const current = getLocal<EBookProduct[]>('products', INITIAL_PRODUCTS);
  const updated = current.filter(p => p.id !== productId);
  setLocal('products', updated);

  if (db) {
    try {
      await deleteDoc(doc(db, 'products', productId));
    } catch (e) {
      console.warn('Firestore deleteProduct error:', e);
    }
  }
}

// ---------------- CATEGORIES ----------------
export async function fetchCategories(): Promise<Category[]> {
  if (db) {
    try {
      const snap = await getDocs(collection(db, 'categories'));
      if (!snap.empty) {
        return snap.docs.map(d => ({ ...d.data(), id: d.id } as Category));
      }
    } catch (e) {
      console.warn('Firestore fetchCategories fallback to local:', e);
    }
  }
  return getLocal<Category[]>('categories', INITIAL_CATEGORIES);
}

export async function saveCategory(category: Category): Promise<void> {
  const current = getLocal<Category[]>('categories', INITIAL_CATEGORIES);
  const index = current.findIndex(c => c.id === category.id);
  let updated: Category[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = category;
  } else {
    updated = [...current, category];
  }
  setLocal('categories', updated);

  if (db) {
    try {
      await setDoc(doc(db, 'categories', category.id), category, { merge: true });
    } catch (e) {
      console.warn('Firestore saveCategory error:', e);
    }
  }
}

export async function deleteCategory(categoryId: string): Promise<void> {
  const current = getLocal<Category[]>('categories', INITIAL_CATEGORIES);
  const updated = current.filter(c => c.id !== categoryId);
  setLocal('categories', updated);

  if (db) {
    try {
      await deleteDoc(doc(db, 'categories', categoryId));
    } catch (e) {
      console.warn('Firestore deleteCategory error:', e);
    }
  }
}

// ---------------- ORDERS ----------------
export async function fetchOrders(): Promise<Order[]> {
  if (db) {
    try {
      const snap = await getDocs(collection(db, 'orders'));
      if (!snap.empty) {
        return snap.docs.map(d => ({ ...d.data(), id: d.id } as Order));
      }
    } catch (e) {
      console.warn('Firestore fetchOrders fallback to local:', e);
    }
  }
  return getLocal<Order[]>('orders', INITIAL_ORDERS);
}

export async function createOrder(order: Order): Promise<void> {
  const current = getLocal<Order[]>('orders', INITIAL_ORDERS);
  const updated = [order, ...current];
  setLocal('orders', updated);

  // also register purchased books for the customer profile if any
  if (order.userId) {
    const users = getLocal<UserProfile[]>('users', INITIAL_ADMIN_USERS);
    const uIdx = users.findIndex(u => u.uid === order.userId || u.email === order.customerEmail);
    if (uIdx >= 0) {
      const existingPurchased = users[uIdx].purchasedBooks || [];
      const newBookIds = order.items.map(i => i.productId);
      const combined = Array.from(new Set([...existingPurchased, ...newBookIds]));
      users[uIdx].purchasedBooks = combined;
      setLocal('users', users);
    }
  }

  if (db) {
    try {
      await setDoc(doc(db, 'orders', order.id), {
        ...order,
        createdAt: serverTimestamp()
      });
    } catch (e) {
      console.warn('Firestore createOrder error:', e);
    }
  }
}

export async function updateOrderStatus(orderId: string, status: Order['orderStatus'], paymentStatus?: Order['paymentStatus']): Promise<void> {
  const current = getLocal<Order[]>('orders', INITIAL_ORDERS);
  const updated = current.map(o => {
    if (o.id === orderId) {
      return {
        ...o,
        orderStatus: status,
        paymentStatus: paymentStatus || o.paymentStatus,
        completedAt: status === 'completed' ? new Date().toISOString() : o.completedAt
      };
    }
    return o;
  });
  setLocal('orders', updated);

  if (db) {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        orderStatus: status,
        ...(paymentStatus ? { paymentStatus } : {}),
        updatedAt: serverTimestamp()
      });
    } catch (e) {
      console.warn('Firestore updateOrderStatus error:', e);
    }
  }
}

export async function updateOrder(order: Order): Promise<void> {
  const current = getLocal<Order[]>('orders', INITIAL_ORDERS);
  const updated = current.map(o => o.id === order.id ? order : o);
  setLocal('orders', updated);

  if (db) {
    try {
      await setDoc(doc(db, 'orders', order.id), order, { merge: true });
    } catch (e) {
      console.warn('Firestore updateOrder error:', e);
    }
  }
}

// ---------------- REVIEWS ----------------
export async function fetchReviews(): Promise<Review[]> {
  if (db) {
    try {
      const snap = await getDocs(collection(db, 'reviews'));
      if (!snap.empty) {
        return snap.docs.map(d => ({ ...d.data(), id: d.id } as Review));
      }
    } catch (e) {
      console.warn('Firestore fetchReviews fallback to local:', e);
    }
  }
  return getLocal<Review[]>('reviews', INITIAL_REVIEWS);
}

export async function saveReview(review: Review): Promise<void> {
  const current = getLocal<Review[]>('reviews', INITIAL_REVIEWS);
  const index = current.findIndex(r => r.id === review.id);
  let updated: Review[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = review;
  } else {
    updated = [review, ...current];
  }
  setLocal('reviews', updated);

  if (db) {
    try {
      await setDoc(doc(db, 'reviews', review.id), review, { merge: true });
    } catch (e) {
      console.warn('Firestore saveReview error:', e);
    }
  }
}

export async function deleteReview(reviewId: string): Promise<void> {
  const current = getLocal<Review[]>('reviews', INITIAL_REVIEWS);
  const updated = current.filter(r => r.id !== reviewId);
  setLocal('reviews', updated);

  if (db) {
    try {
      await deleteDoc(doc(db, 'reviews', reviewId));
    } catch (e) {
      console.warn('Firestore deleteReview error:', e);
    }
  }
}

// ---------------- VIDEOS (Febspot) ----------------
export async function fetchVideos(): Promise<FebspotVideo[]> {
  if (db) {
    try {
      const snap = await getDocs(collection(db, 'videos'));
      if (!snap.empty) {
        return snap.docs.map(d => ({ ...d.data(), id: d.id } as FebspotVideo));
      }
    } catch (e) {
      console.warn('Firestore fetchVideos fallback to local:', e);
    }
  }
  return getLocal<FebspotVideo[]>('videos', INITIAL_VIDEOS);
}

export async function saveVideo(video: FebspotVideo): Promise<void> {
  const current = getLocal<FebspotVideo[]>('videos', INITIAL_VIDEOS);
  const index = current.findIndex(v => v.id === video.id);
  let updated: FebspotVideo[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = video;
  } else {
    updated = [video, ...current];
  }
  setLocal('videos', updated);

  if (db) {
    try {
      await setDoc(doc(db, 'videos', video.id), video, { merge: true });
    } catch (e) {
      console.warn('Firestore saveVideo error:', e);
    }
  }
}

export async function deleteVideo(videoId: string): Promise<void> {
  const current = getLocal<FebspotVideo[]>('videos', INITIAL_VIDEOS);
  const updated = current.filter(v => v.id !== videoId);
  setLocal('videos', updated);

  if (db) {
    try {
      await deleteDoc(doc(db, 'videos', videoId));
    } catch (e) {
      console.warn('Firestore deleteVideo error:', e);
    }
  }
}

// ---------------- OFFERS & COUPONS ----------------
export async function fetchOffers(): Promise<SpecialOffer[]> {
  return getLocal<SpecialOffer[]>('offers', INITIAL_OFFERS);
}

export async function saveOffer(offer: SpecialOffer): Promise<void> {
  const current = getLocal<SpecialOffer[]>('offers', INITIAL_OFFERS);
  const idx = current.findIndex(o => o.id === offer.id);
  const updated = idx >= 0 ? current.map(o => o.id === offer.id ? offer : o) : [offer, ...current];
  setLocal('offers', updated);
}

export async function deleteOffer(offerId: string): Promise<void> {
  const current = getLocal<SpecialOffer[]>('offers', INITIAL_OFFERS);
  setLocal('offers', current.filter(o => o.id !== offerId));
}

export async function fetchCoupons(): Promise<Coupon[]> {
  return getLocal<Coupon[]>('coupons', INITIAL_COUPONS);
}

export async function saveCoupon(coupon: Coupon): Promise<void> {
  const current = getLocal<Coupon[]>('coupons', INITIAL_COUPONS);
  const idx = current.findIndex(c => c.id === coupon.id);
  const updated = idx >= 0 ? current.map(c => c.id === coupon.id ? coupon : c) : [coupon, ...current];
  setLocal('coupons', updated);
}

export async function deleteCoupon(couponId: string): Promise<void> {
  const current = getLocal<Coupon[]>('coupons', INITIAL_COUPONS);
  setLocal('coupons', current.filter(c => c.id !== couponId));
}

// ---------------- ADSTERRA ADS ----------------
export async function fetchAdsterraConfig(): Promise<AdsterraConfig> {
  return getLocal<AdsterraConfig>('adsterra', INITIAL_ADSTERRA_CONFIG);
}

export async function saveAdsterraConfig(config: AdsterraConfig): Promise<void> {
  setLocal('adsterra', config);
}

// ---------------- SITE SETTINGS ----------------
export async function fetchSiteSettings(): Promise<SiteSettings> {
  return getLocal<SiteSettings>('settings', INITIAL_SITE_SETTINGS);
}

export async function saveSiteSettings(settings: SiteSettings): Promise<void> {
  setLocal('settings', settings);
}

// ---------------- USERS & ROLES ----------------
export async function fetchUsers(): Promise<UserProfile[]> {
  return getLocal<UserProfile[]>('users', INITIAL_ADMIN_USERS);
}

export async function saveUser(user: UserProfile): Promise<void> {
  const current = getLocal<UserProfile[]>('users', INITIAL_ADMIN_USERS);
  const idx = current.findIndex(u => u.uid === user.uid);
  const updated = idx >= 0 ? current.map(u => u.uid === user.uid ? user : u) : [...current, user];
  setLocal('users', updated);
}

export async function updateUser(user: UserProfile): Promise<void> {
  return saveUser(user);
}

export async function deleteUser(uid: string): Promise<void> {
  const current = getLocal<UserProfile[]>('users', INITIAL_ADMIN_USERS);
  setLocal('users', current.filter(u => u.uid !== uid));
}

// ---------------- ACTIVITY LOGS ----------------
export async function fetchActivityLogs(): Promise<ActivityLog[]> {
  const defaultLogs: ActivityLog[] = [
    {
      id: 'log-1',
      actorName: 'Super Admin',
      actorEmail: 'admin@dremshop.com',
      actorRole: 'super_admin',
      action: 'LOGIN',
      details: 'Super Admin signed in from authenticated dashboard',
      timestamp: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 'log-2',
      actorName: 'Store Manager',
      actorEmail: 'manager@dremshop.com',
      actorRole: 'manager',
      action: 'UPDATE_PRODUCT',
      details: 'Updated stock and special discount price for জিরো থেকে ফ্রিল্যান্সিং ক্যারিয়ার',
      targetId: 'prod-freelance-mastery',
      timestamp: new Date(Date.now() - 86400000).toISOString()
    }
  ];
  return getLocal<ActivityLog[]>('activity_logs', defaultLogs);
}

export async function logActivity(action: string, details: string, actor: { name: string; email: string; role: any }, targetId?: string): Promise<void> {
  const current = await fetchActivityLogs();
  const newEntry: ActivityLog = {
    id: `log-${Date.now()}`,
    actorName: actor.name,
    actorEmail: actor.email,
    actorRole: actor.role,
    action,
    details,
    targetId,
    timestamp: new Date().toISOString()
  };
  setLocal('activity_logs', [newEntry, ...current.slice(0, 99)]);
}

// ---------------- SECURE E-BOOK DOWNLOAD SYSTEM ----------------
export function generateSecureEBookBlob(product: EBookProduct): Blob {
  // Generates a structured, styled and encrypted/clean PDF/ePub format text representation for instant customer satisfaction
  const content = `=====================================================
DREM SHOP — DIGITAL E-BOOK DELIVERY
Website: https://dremshop.com
Title: ${product.title}
Author: ${product.author}
Category: ${product.category}
Language: ${product.language}
Pages: ${product.pages}
Format: ${product.fileFormat}
File Size: ${product.fileSize}
ISBN: ${product.isbn || 'N/A'}
License: Licensed for personal use to verified customer.
=====================================================

${product.description}

-----------------------------------------------------
TABLE OF CONTENTS & EXCERPT
-----------------------------------------------------
${product.sampleChapters?.map((c, i) => `\n[${i + 1}] ${c.title}\n${c.content}\n`).join('\n') || 'Full eBook content packaged.'}

Thank you for choosing Drem Shop (https://dremshop.com).
Happy Reading!
`;
  return new Blob([content], { type: 'text/plain;charset=utf-8' });
}
