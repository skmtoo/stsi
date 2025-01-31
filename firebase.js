// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Firestoreを利用
import { getAuth } from "firebase/auth"; // Authenticationを利用
import { getAnalytics } from "firebase/analytics"; // Analyticsを利用（必要であれば）
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCD7bCZalTbiDeLa7jHHx4zuIQZs9Y_Yq0",
  authDomain: "sample1-d7832.firebaseapp.com",
  projectId: "sample1-d7832",
  storageBucket: "sample1-d7832.appspot.com", // storageBucket の値を修正
  messagingSenderId: "752065987599",
  appId: "1:752065987599:web:35ac29065a73fff4d44f7a",
  measurementId: "G-G4GK3HCJ4S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Authentication
const auth = getAuth(app);

// Initialize Analytics (if needed)
const analytics = getAnalytics(app);

// Export necessary Firebase services
export { db, auth, analytics };

export const adminEmail = "rikurin85@icloud.com"; // 管理者のメールアドレス
