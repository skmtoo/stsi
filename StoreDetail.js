import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./StoreDetail.css"; // スタイルシートを適用

const StoreDetail = () => {
  const { id } = useParams(); // URLパラメータから店舗IDを取得
  const [store, setStore] = useState(null); // 店舗データの状態

  useEffect(() => {
    // 店舗データを取得
    fetch("/data/stores.json")
      .then((response) => response.json())
      .then((data) => {
        const foundStore = data.find((store) => store.id === id); // 店舗IDで検索
        setStore(foundStore);
      })
      .catch((error) => console.error("Error loading store details:", error));
  }, [id]); // id が変更されるたびに再実行

  if (!store) {
    return <div>店舗が見つかりません</div>;
  }

  return (
    <div className="store-detail">
      {/* 店舗画像 */}
      <div className="store-image">
        <img src={store.image} alt={store.name} />
      </div>

      {/* 店舗情報 */}
      <div className="store-info">
        <h2>{store.name}</h2>
        <p><strong>営業時間:</strong> {store.hours}</p>
      </div>

      {/* 店舗の説明 */}
      <div className="store-description">
        <p>{store.description}</p>
      </div>

      {/* レビュー一覧 */}
      <div className="reviews">
        <h3>レビュー</h3>
        {store.reviews && store.reviews.length > 0 ? (
          store.reviews.map((review, index) => (
            <div key={index} className="review">
              <p>
                <strong>{review.user}</strong>: {review.comment} (評価: {review.rating}★)
              </p>
            </div>
          ))
        ) : (
          <p>まだレビューはありません。</p>
        )}
      </div>

      {/* レビュー投稿ボタン */}
      <div className="review-button-container">
        <Link to={`/store/${store.id}/review`} className="review-button">
          レビューを書く
        </Link>
      </div>

      {/* 戻るボタン */}
      <div className="back-button-container">
        <button onClick={() => window.history.back()}>戻る</button>
      </div>
    </div>
  );
};

export default StoreDetail;
