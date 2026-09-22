import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

export interface FirebaseConfigOptions {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  firestoreDatabaseId?: string;
}

// Retrieve any custom runtime or stored Firebase configuration
export function getActiveFirebaseConfig(): FirebaseConfigOptions | null {
  try {
    const saved = localStorage.getItem('dremshop_firebase_config');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed?.apiKey && parsed?.projectId) {
        return parsed;
      }
    }
  } catch {
    // Ignore error
  }

  // Next check environment variables (if configured)
  const envKey = (import.meta as any).env?.VITE_FIREBASE_API_KEY;
  const envProject = (import.meta as any).env?.VITE_FIREBASE_PROJECT_ID;
  if (envKey && envProject) {
    return {
      apiKey: envKey,
      authDomain: (import.meta as any).env?.VITE_FIREBASE_AUTH_DOMAIN || `${envProject}.firebaseapp.com`,
      projectId: envProject,
      storageBucket: (import.meta as any).env?.VITE_FIREBASE_STORAGE_BUCKET || `${envProject}.appspot.com`,
      messagingSenderId: (import.meta as any).env?.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: (import.meta as any).env?.VITE_FIREBASE_APP_ID,
    };
  }

  return null;
}

let firebaseApp: FirebaseApp | null = null;
let firebaseAuth: Auth | null = null;
let firestoreDb: Firestore | null = null;
let firebaseStorageInstance: FirebaseStorage | null = null;

const config = getActiveFirebaseConfig();
if (config && config.apiKey && config.projectId) {
  try {
    if (!getApps().length) {
      firebaseApp = initializeApp(config);
    } else {
      firebaseApp = getApps()[0];
    }
    firebaseAuth = getAuth(firebaseApp);
    firestoreDb = config.firestoreDatabaseId
      ? getFirestore(firebaseApp, config.firestoreDatabaseId)
      : getFirestore(firebaseApp);
    firebaseStorageInstance = getStorage(firebaseApp);
    console.log('[Drem Shop] Firebase successfully initialized with project:', config.projectId);
  } catch (err) {
    console.warn('[Drem Shop] Firebase initialization failed or offline mode enabled:', err);
  }
}

export const app = firebaseApp;
export const auth = firebaseAuth;
export const db = firestoreDb;
export const storage = firebaseStorageInstance;
export const isFirebaseConfigured = Boolean(firebaseApp && firestoreDb);
