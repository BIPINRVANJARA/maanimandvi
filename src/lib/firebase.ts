// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAHBLB8jSWy2wxJ3JcK1WA60xGkbcTyzEA",
  authDomain: "sampleproject-24ea9.firebaseapp.com",
  databaseURL: "https://sampleproject-24ea9-default-rtdb.firebaseio.com",
  projectId: "sampleproject-24ea9",
  storageBucket: "sampleproject-24ea9.firebasestorage.app",
  messagingSenderId: "283881343424",
  appId: "1:283881343424:web:b09610bd5f6f745f752025",
  measurementId: "G-7LSX8P5EDY",
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
