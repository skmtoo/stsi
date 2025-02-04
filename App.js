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
import AdminPage from "./pages/AdminPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import "./App.css";

const ADMIN_EMAIL = "rikurin85@icloud.com"; // 管理者のメールアドレス

function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); // 認証情報の取得状態を管理

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("ログインユーザー:", currentUser); // デバッグ用ログ
      setUser(currentUser);
      setIsAdmin(currentUser?.email === ADMIN_EMAIL);
      setLoading(false); // 認証情報を取得し終わったらロード完了
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>読み込み中...</div>; // 認証情報の取得中は読み込み中の表示
  }

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

            {/* 管理者専用ページ */}
            <Route
              path="/admin"
              element={
                isAdmin ? (
                  <AdminPage />
                ) : user ? (
                  <Navigate to="/mypage" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route path="*" element={<div>404 - ページが見つかりません</div>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
