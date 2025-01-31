import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // FirebaseのFirestoreをインポート
import "./ReviewPage.css"; // スタイルシートを適用

const ReviewPage = () => {
  const { id } = useParams(); // URLから店舗IDを取得
  const [reviews, setReviews] = useState([]); // レビュー一覧
  const [newReview, setNewReview] = useState({
    user: "",
    comment: "",
    rating: 5,
  }); // 新しいレビュー

  useEffect(() => {
    // Firestoreから特定店舗のレビューを取得
    const fetchReviews = async () => {
      const q = query(collection(db, "reviews"), where("storeId", "==", id));
      const querySnapshot = await getDocs(q);
      const fetchedReviews = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(fetchedReviews);
    };

    fetchReviews();
  }, [id]);

  const handleReviewSubmit = async () => {
    if (newReview.user && newReview.comment) {
      try {
        // Firestoreにレビューを保存
        await addDoc(collection(db, "reviews"), {
          storeId: id,
          ...newReview,
        });

        // 新しいレビューをローカルにも追加
        setReviews([...reviews, newReview]);
        setNewReview({ user: "", comment: "", rating: 5 }); // フォームをリセット
      } catch (error) {
        console.error("レビューの投稿に失敗しました:", error);
      }
    }
  };

  return (
    <div className="review-page">
      <Link to={`/store/${id}`} className="back-link">
        ← 店舗詳細ページに戻る
      </Link>

      <h2 className="title">レビュー</h2>

      <div className="review-section">
        <h3 className="subtitle">レビュー一覧</h3>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="review">
              <p>
                <strong>{review.user}</strong>: {review.comment} (評価:{" "}
                {review.rating}★)
              </p>
            </div>
          ))
        ) : (
          <p>まだレビューはありません。</p>
        )}
      </div>

      <div className="form-section">
        <h3 className="subtitle">レビューを書く</h3>
        <input
          type="text"
          placeholder="お名前"
          value={newReview.user}
          onChange={(e) =>
            setNewReview({ ...newReview, user: e.target.value })
          }
          className="input"
        />
        <textarea
          placeholder="レビューコメント"
          value={newReview.comment}
          onChange={(e) =>
            setNewReview({ ...newReview, comment: e.target.value })
          }
          className="textarea"
        />
        <div>
          <label>評価:</label>
          <select
            value={newReview.rating}
            onChange={(e) =>
              setNewReview({ ...newReview, rating: parseInt(e.target.value) })
            }
            className="select"
          >
            <option value={1}>1★</option>
            <option value={2}>2★</option>
            <option value={3}>3★</option>
            <option value={4}>4★</option>
            <option value={5}>5★</option>
          </select>
        </div>
        <button onClick={handleReviewSubmit} className="button">
          レビューを投稿
        </button>
      </div>
    </div>
  );
};

export default ReviewPage;
