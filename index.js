import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// 'root' 要素を取得
const rootElement = document.getElementById("root");

// 'root' 要素が見つからない場合のエラーハンドリングを強化
if (!rootElement) {
  console.error("エラー: 'root' の要素が見つかりません。index.html を確認してください。");
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // パフォーマンス計測（必要であれば有効化）
  reportWebVitals(console.log);
}
