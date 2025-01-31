import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MapboxSearch from "./MapboxSearch";
import StoreDetail from "./components/StoreDetail";
import Footer from "./components/Footer";
import Events from "./pages/Events";
import ReviewPage from "./pages/ReviewPage";
import MyPage from "./pages/MyPage";
import History from "./pages/History";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage"; // 管理者ページ
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import "./App.css";

const ADMIN_EMAIL = "rikurin85@icloud.com"; // 管理者のメールアドレス

function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAdmin(currentUser?.email === ADMIN_EMAIL); // 管理者判定
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <div className="app-content">
          <Routes>
            <Route path="/" element={<MapboxSearch />} />
            <Route path="/store/:id" element={<StoreDetail />} />
            <Route path="/store/:id/reviews" element={<ReviewPage />} />
            <Route path="/events" element={<Events />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/mypage" element={user ? <MyPage /> : <Navigate to="/login" />} />
            <Route path="/history" element={user ? <History /> : <Navigate to="/login" />} />
            
            {/* 管理者専用ページ（isAdminがtrueのときのみアクセス可能） */}
            <Route path="/admin" element={isAdmin ? <AdminPage /> : <Navigate to="/login" />} />

            <Route path="*" element={<div>404 - ページが見つかりません</div>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
