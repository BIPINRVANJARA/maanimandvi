// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

// Maa Ni Mandvi — Firebase configuration
// Project: sampleproject-24ea9
export const firebaseConfig = {
  apiKey: "AIzaSyAHBLB8jSWy2wxJ3JcK1WA60xGkbcTyzEA",
  authDomain: "sampleproject-24ea9.firebaseapp.com",
  databaseURL: "https://sampleproject-24ea9-default-rtdb.firebaseio.com",
  projectId: "sampleproject-24ea9",
  storageBucket: "sampleproject-24ea9.firebasestorage.app",
  messagingSenderId: "283881343424",
  appId: "1:283881343424:web:08cfd35881d9f78f752025",
  measurementId: "G-XLJYK7ES2P",
};

// Initialize Firebase
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export let analytics: Analytics | null = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}
