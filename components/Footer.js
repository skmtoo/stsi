import React from "react";
import { FaHome, FaCalendarAlt, FaHistory, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div style={styles.footer}>
      <div style={styles.navLinks}>
        <Link to="/" style={styles.link} aria-label="ホーム">
          <FaHome style={styles.icon} /> ホーム
        </Link>
        <Link to="/events" style={styles.link} aria-label="イベント">
          <FaCalendarAlt style={styles.icon} /> イベント
        </Link>
        <Link to="/history" style={styles.link} aria-label="履歴">
          <FaHistory style={styles.icon} /> 履歴
        </Link>
        <Link to="/mypage" style={styles.link} aria-label="マイページ">
          <FaUser style={styles.icon} /> マイページ
        </Link>
      </div>
      <div style={styles.copyRight}>
      </div>
    </div>
  );
};

const styles = {
  footer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#fff",
    padding: "10px 0",
    textAlign: "center",
    boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
    zIndex: 1000,
  },
  navLinks: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px",
  },
  link: {
    margin: "0 15px",
    textDecoration: "none",
    color: "#007bff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  icon: {
    fontSize: "20px",
    marginBottom: "5px",
  },
  copyRight: {
    fontSize: "12px",
    color: "#777",
    marginTop: "10px",
  },
};

export default Footer;
