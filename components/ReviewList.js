import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../firebase"; // FirebaseのFirestoreインスタンス

const ReviewList = ({ storeId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(collection(db, "reviews"), where("storeId", "==", storeId));
        const querySnapshot = await getDocs(q);
        const fetchedReviews = querySnapshot.docs.map((doc) => doc.data());
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("レビューの取得に失敗しました:", error);
      }
    };

    fetchReviews();
  }, [storeId]);

  return (
    <div>
      <h3>レビュー一覧</h3>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index}>
            <p><strong>{review.user}</strong>: {review.comment}</p>
            <p>評価: {review.rating} 星</p>
          </div>
        ))
      ) : (
        <p>まだレビューはありません。</p>
      )}
    </div>
  );
};

export default ReviewList;
