import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ReviewPage.css";

const ReviewPage = () => {
  const { id } = useParams(); // 店舗ID
  const navigate = useNavigate(); // ページ遷移
  const [review, setReview] = useState({ user: "", comment: "", rating: 5 }); // レビューの状態

  const handleSubmit = (e) => {
    e.preventDefault();

    // レビューを保存する処理（仮想的に実装。実際にはバックエンド連携が必要）
    console.log("レビューを投稿:", { storeId: id, ...review });

    // 投稿後に詳細ページに戻る
    navigate(`/store/${id}`);
  };

  return (
    <div className="review-page">
      <h2>レビューを書く</h2>
      <form onSubmit={handleSubmit}>
        <label>
          お名前:
          <input
            type="text"
            value={review.user}
            onChange={(e) => setReview({ ...review, user: e.target.value })}
            required
          />
        </label>
        <label>
          コメント:
          <textarea
            value={review.comment}
            onChange={(e) => setReview({ ...review, comment: e.target.value })}
            required
          />
        </label>
        <label>
          評価:
          <select
            value={review.rating}
            onChange={(e) => setReview({ ...review, rating: Number(e.target.value) })}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}★
              </option>
            ))}
          </select>
        </label>
        <button type="submit">投稿する</button>
      </form>
      <button onClick={() => navigate(-1)}>戻る</button>
    </div>
  );
};

export default ReviewPage;
