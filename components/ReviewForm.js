import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import db from "../firebase"; // FirebaseのFirestoreインスタンス

const ReviewForm = ({ storeId }) => {
  const [review, setReview] = useState({
    user: "",
    comment: "",
    rating: 5,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Firestoreのコレクションにデータを追加
      await addDoc(collection(db, "reviews"), {
        ...review,
        storeId: storeId, // 店舗IDを関連付け
        createdAt: new Date(),
      });
      alert("レビューを投稿しました！");
      setReview({ user: "", comment: "", rating: 5 }); // フォームをリセット
    } catch (error) {
      console.error("レビューの投稿に失敗しました:", error);
      alert("エラーが発生しました。もう一度お試しください。");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>レビューを書く</h3>
      <input
        type="text"
        placeholder="お名前"
        value={review.user}
        onChange={(e) => setReview({ ...review, user: e.target.value })}
        required
      />
      <textarea
        placeholder="コメント"
        value={review.comment}
        onChange={(e) => setReview({ ...review, comment: e.target.value })}
        required
      />
      <select
        value={review.rating}
        onChange={(e) => setReview({ ...review, rating: parseInt(e.target.value) })}
      >
        {[1, 2, 3, 4, 5].map((rating) => (
          <option key={rating} value={rating}>
            {rating} 星
          </option>
        ))}
      </select>
      <button type="submit">投稿</button>
    </form>
  );
};

export default ReviewForm;
