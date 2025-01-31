import React, { useState } from "react";
import { Link } from "react-router-dom";

// イベントデータ（画像リンクをそのまま維持）
const events = [
  {
    id: 1,
    title: "中崎町文化祭",
    description: "中崎町の文化とアートを体験できる地元のお祭りです。",
    date: "2025-02-15",
    thumbnail: "/images/hamstar.jpg", // リンクそのまま
  },
  {
    id: 2,
    title: "中崎町コーヒー市",
    description: "地元カフェによるコーヒーの試飲や販売イベント。",
    date: "2025-03-01",
    thumbnail: "/images/hamstar.jpg", // リンクそのまま
  },
  {
    id: 3,
    title: "中崎町の夜市",
    description: "夜の中崎町で楽しむアンティーク市とライブイベント。",
    date: "2025-03-20",
    thumbnail: "/images/hamstar.jpg", // リンクそのまま
  },
  {
    id: 4,
    title: "中崎町歴史散策ツアー",
    description: "地元の歴史を知るガイド付きツアー。",
    date: "2025-04-10",
    thumbnail: "/images/hamstar.jpg", // リンクそのまま
  },
];

// 月ごとにユニークなリストを取得
const getUniqueMonths = (events) => {
  const months = events.map((event) => event.date.substring(0, 7)); // YYYY-MM形式
  return [...new Set(months)];
};

const Events = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const uniqueMonths = getUniqueMonths(events);

  const filteredEvents = selectedMonth
    ? events.filter((event) => event.date.startsWith(selectedMonth))
    : events;

  return (
    <div style={styles.container}>
      {/* フィルター */}
      <div style={styles.header}>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          style={styles.filterSelect}
        >
          <option value="">すべての月</option>
          {uniqueMonths.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* イベントリスト */}
      <div style={styles.eventList}>
        {filteredEvents.map((event) => (
          <Link
            to={`/events/${event.id}`} // 詳細ページへのリンク
            key={event.id}
            style={styles.cardLink}
          >
            <div style={styles.eventCard}>
              <img
                src={event.thumbnail}
                alt={event.title}
                style={styles.thumbnail}
              />
              <div style={styles.details}>
                <h3 style={styles.title}>{event.title}</h3>
                <p style={styles.date}>{event.date}</p>
                <p style={styles.description}>{event.description}</p>
                <Link to={`/events/${event.id}`} style={styles.button}>
                  詳細を見る
                </Link>
              </div>
            </div>
          </Link>
        ))}
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
  header: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "20px",
    padding: "10px 0",
  },
  filterSelect: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.2s ease",
    cursor: "pointer",
    width: "200px", // フィルタセレクターの幅調整
  },
  eventList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "15px",
  },
  cardLink: {
    textDecoration: "none",
  },
  eventCard: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    maxWidth: "100%",
    '&:hover': {
      transform: "scale(1.05)",  // ホバー時にカード拡大
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",  // 影を強調
    },
  },
  thumbnail: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  details: {
    padding: "15px",
    textAlign: "left",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "5px 0",
    color: "#333",
  },
  date: {
    fontSize: "14px",
    color: "#777",
    marginBottom: "5px",
  },
  description: {
    fontSize: "14px",
    color: "#555",
  },
  button: {
    display: "inline-block",
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#FF9900",  // Amazon風の黄色
    color: "#fff",
    borderRadius: "6px",
    textAlign: "center",
    fontWeight: "bold",
    textDecoration: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#e68900",  // ホバー時の色
  },
};

export default Events;
