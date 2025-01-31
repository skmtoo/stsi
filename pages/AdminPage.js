import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const AdminPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scanResult, setScanResult] = useState("");
  const [scannedUser, setScannedUser] = useState(null);

  // レビュー一覧を取得
  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsCollection = collection(db, "reviews");
      const reviewSnapshot = await getDocs(reviewsCollection);
      const reviewsList = reviewSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(reviewsList);
      setLoading(false);
    };

    fetchReviews();
  }, []);

  // レビュー削除
  const handleDeleteReview = async (id) => {
    try {
      await deleteDoc(doc(db, "reviews", id));
      setReviews(reviews.filter((review) => review.id !== id)); // ローカル状態を更新
      alert("レビューが削除されました。");
    } catch (error) {
      console.error("レビュー削除中にエラーが発生しました:", error);
    }
  };

  // バーコードをスキャンして会員情報を取得
  const handleScan = async (barcode) => {
    if (!barcode) return;
    setScanResult(barcode);

    // Firestoreから会員情報を取得
    const userRef = doc(db, "users", barcode);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      setScannedUser({ id: barcode, ...userData });
    } else {
      alert("会員が見つかりません");
      setScannedUser(null);
    }
  };

  // スタンプを追加
  const addStamp = async () => {
    if (!scannedUser) return;

    const userRef = doc(db, "users", scannedUser.id);
    try {
      await updateDoc(userRef, {
        stamps: (scannedUser.stamps || 0) + 1, // スタンプ数を増やす
      });

      alert("スタンプが追加されました！");
      setScannedUser((prev) => ({ ...prev, stamps: prev.stamps + 1 }));
    } catch (error) {
      console.error("スタンプ追加中にエラーが発生しました:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>管理者ページ</h1>
      <p style={styles.subtitle}>ここでレビューの管理や会員コードの読み取りができます。</p>

      {/* バーコードスキャンエリア */}
      <div style={styles.card}>
        <h2 style={styles.sectionTitle}>会員バーコードスキャン</h2>
        <BarcodeScannerComponent
          width={300}
          height={200}
          onUpdate={(err, result) => {
            if (result) handleScan(result.text);
          }}
        />
        {scannedUser && (
          <div style={styles.userInfo}>
            <p><strong>会員ID:</strong> {scannedUser.id}</p>
            <p><strong>名前:</strong> {scannedUser.name || "未登録"}</p>
            <p><strong>現在のスタンプ数:</strong> {scannedUser.stamps || 0}</p>
            <button style={styles.stampButton} onClick={addStamp}>✨ スタンプを追加 ✨</button>
          </div>
        )}
      </div>

      {/* レビュー管理 */}
      <div style={styles.card}>
        <h2 style={styles.sectionTitle}>レビュー管理</h2>
        {loading ? (
          <p>読み込み中...</p>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} style={styles.review}>
              <p>
                <strong>{review.user}</strong>: {review.comment} (評価: {review.rating}★)
              </p>
              <button
                style={styles.deleteButton}
                onClick={() => handleDeleteReview(review.id)}
              >
                ❌ 削除
              </button>
            </div>
          ))
        ) : (
          <p>レビューがありません。</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: "#f7f9fc",
    minHeight: "100vh",
    textAlign: "center",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "16px",
    color: "#7f8c8d",
    marginBottom: "20px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
    padding: "20px",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#34495e",
    marginBottom: "15px",
    borderBottom: "2px solid #3498db",
    paddingBottom: "5px",
  },
  userInfo: {
    backgroundColor: "#f9f9f9",
    padding: "15px",
    borderRadius: "8px",
    marginTop: "10px",
    border: "1px solid #ddd",
  },
  stampButton: {
    padding: "12px 20px",
    backgroundColor: "#27ae60",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s",
    marginTop: "10px",
  },
  stampButtonHover: {
    backgroundColor: "#218c53",
  },
  review: {
    padding: "10px",
    borderBottom: "1px solid #ccc",
    marginBottom: "10px",
    backgroundColor: "#ecf0f1",
    borderRadius: "8px",
    textAlign: "left",
  },
  deleteButton: {
    padding: "8px 12px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  deleteButtonHover: {
    backgroundColor: "#c0392b",
  },
};

export default AdminPage;
