import React from "react";
import { useParams, useNavigate } from "react-router-dom";

// サンプルのイベントデータ
const events = [
  {
    id: 1,
    title: "中崎町文化祭",
    description:
      "中崎町の文化とアートを体験できる地元のお祭りです。地元のアーティストや工芸家が集まり、独特の雰囲気を楽しむことができます。",
    date: "2025-02-15",
    location: "中崎町公園",
    image: "/images/hamstar.jpg",
    content:
      "中崎町文化祭では、地元の特産品や手作りのアート作品が販売されます。また、地元のカフェや飲食店も参加し、おいしい食べ物や飲み物を楽しめます。ライブパフォーマンスやワークショップも開催され、家族連れでも楽しめるイベントです。ぜひお越しください！",
  },
  {
    id: 2,
    title: "中崎町コーヒー市",
    description: "地元カフェによるコーヒーの試飲や販売イベント。",
    date: "2025-03-01",
    location: "中崎町カフェ通り",
    image: "/images/hamstar.jpg",
    content:
      "中崎町コーヒー市では、地元の人気カフェが自慢のコーヒーを提供します。スペシャルティコーヒーの試飲や、コーヒー豆の購入が可能です。また、コーヒーに合うスイーツや軽食も販売され、コーヒー好きにはたまらないイベントとなっています。",
  },
  {
    id: 3,
    title: "中崎町の夜市",
    description: "夜の中崎町で楽しむアンティーク市とライブイベント。",
    date: "2025-03-20",
    location: "中崎町中央広場",
    image: "/images/hamstar.jpg",
    content:
      "中崎町の夜市では、地元のアンティークショップが集まり、夜の街を彩ります。夜市ならではのライトアップと、地元ミュージシャンによるライブパフォーマンスが楽しめます。美味しい屋台料理も出店予定です。大人も子供も楽しめるイベントです！",
  },
  {
    id: 4,
    title: "中崎町歴史散策ツアー",
    description: "地元の歴史を知るガイド付きツアー。",
    date: "2025-04-10",
    location: "中崎町観光案内所",
    image: "/images/hamstar.jpg",
    content:
      "中崎町歴史散策ツアーでは、地元の歴史に詳しいガイドが街を案内します。昔ながらの建築物や中崎町の文化的背景について学べる貴重な機会です。参加者には特製マップと記念品が配布されます。",
  },
];

const EventDetail = () => {
  const { id } = useParams(); // URLの:idからイベントIDを取得
  const navigate = useNavigate();
  const event = events.find((e) => e.id === parseInt(id)); // イベントデータから該当のイベントを取得

  if (!event) {
    return <div>イベントが見つかりません。</div>;
  }

  return (
    <div style={styles.container}>
      {/* 戻るボタン */}
      <button onClick={() => navigate(-1)} style={styles.backButton}>
        戻る
      </button>

      {/* イベント詳細 */}
      <div style={styles.eventDetail}>
        <img src={event.image} alt={event.title} style={styles.image} />
        <h1 style={styles.title}>{event.title}</h1>
        <p style={styles.date}>{event.date}</p>
        <p style={styles.location}>
          <strong>場所:</strong> {event.location}
        </p>
        <p style={styles.description}>{event.description}</p>
        <div style={styles.content}>{event.content}</div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  },
  backButton: {
    marginBottom: "20px",
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  eventDetail: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "left",
  },
  image: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#333",
  },
  date: {
    fontSize: "16px",
    color: "#777",
    marginBottom: "10px",
  },
  location: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "20px",
  },
  description: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "20px",
  },
  content: {
    fontSize: "14px",
    color: "#333",
    lineHeight: "1.6",
  },
};

export default EventDetail;
