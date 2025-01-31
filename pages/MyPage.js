import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaStamp } from "react-icons/fa";
import Barcode from "react-barcode";
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; // Firebaseのauthをインポート
import { onAuthStateChanged } from "firebase/auth"; // 認証情報を監視する

const ADMIN_EMAIL = "rikurin85@icloud.com"; // 管理者のメールアドレス

const generateMemberCode = () => {
  return `MEMBER-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
};

const MyPage = () => {
  const [memberCode] = useState(generateMemberCode());
  const [stamps, setStamps] = useState(0);
  const [history, setHistory] = useState([]);
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // 管理者フラグ
  const navigate = useNavigate();

  useEffect(() => {
    // Firebase認証情報を取得
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setProfile({ name: user.displayName || "未設定", email: user.email || "未設定" });
        setIsAdmin(user.email === ADMIN_EMAIL); // 管理者かどうかを判定
      } else {
        setProfile({ name: "", email: "" });
        setIsAdmin(false);
      }
    });

    return () => unsubscribe(); // クリーンアップ
  }, []);

  const handleSaveProfile = () => {
    localStorage.setItem("profile", JSON.stringify(profile));
    setIsEditing(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("ログアウトしました。");
      navigate("/login");
    } catch (error) {
      console.error("ログアウトエラー:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>マイページ</h2>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>プロフィール</h3>
        {isEditing ? (
          <div>
            <div style={styles.formGroup}>
              <label style={styles.label}>名前:</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>メール:</label>
              <input
                type="email"
                value={profile.email}
                readOnly
                style={{ ...styles.input, backgroundColor: "#eee" }}
              />
            </div>
            <button onClick={handleSaveProfile} style={styles.buttonPrimary}>保存</button>
          </div>
        ) : (
          <div>
            <p style={styles.text}>名前: {profile.name || "未設定"}</p>
            <p style={styles.text}>メール: {profile.email || "未設定"}</p>
            <button onClick={() => setIsEditing(true)} style={styles.buttonPrimary}>編集</button>
          </div>
        )}
      </div>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>会員コード</h3>
        <div style={styles.barcodeWrapper}>
          <Barcode value={memberCode} width={1.5} height={50} displayValue={true} fontSize={14} margin={0} />
        </div>
      </div>

      {/* 管理者ページボタン（isAdminがtrueの場合のみ表示） */}
      {isAdmin && (
        <div style={styles.card}>
          <button onClick={() => navigate("/admin")} style={styles.buttonAdmin}>
            管理者ページへ
          </button>
        </div>
      )}

      {/* ログアウトボタン */}
      <div style={styles.card}>
        <button onClick={handleLogout} style={styles.buttonDanger}>
          ログアウト
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "#f4faff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    color: "#2c3e50",
    fontSize: "26px",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
    padding: "20px",
  },
  cardTitle: {
    fontSize: "20px",
    color: "#34495e",
    marginBottom: "15px",
    textAlign: "center",
    borderBottom: "2px solid #3498db",
    paddingBottom: "5px",
  },
  barcodeWrapper: {
    display: "flex",
    justifyContent: "center",
    overflow: "hidden",
    padding: "10px",
  },
  text: {
    fontSize: "15px",
    color: "#555",
    marginBottom: "10px",
  },
  buttonPrimary: {
    padding: "10px 20px",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  buttonAdmin: {
    padding: "10px 20px",
    backgroundColor: "#2ecc71",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  buttonDanger: {
    padding: "10px 20px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default MyPage;
