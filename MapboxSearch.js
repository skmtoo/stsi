import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Link } from "react-router-dom"; // Link コンポーネントをインポート
import "./MapboxSearch.css"; // 必要なスタイルファイルをインポート

mapboxgl.accessToken = "pk.eyJ1Ijoic2ttdDA4MDAiLCJhIjoiY201cWQ4N2FwMGJrNTJpb2t6anQ4bmN5aCJ9.4WgbtFTY58GAJcyyK1VxZg";

const MapboxSearch = () => {
  const mapContainer = useRef(null); // マップコンテナ
  const map = useRef(null); // マップインスタンス
  const [storeData, setStoreData] = useState([]); // 店舗データ
  const [currentLocation, setCurrentLocation] = useState(null); // 現在地
  const [selectedStore, setSelectedStore] = useState(null); // 選択された店舗
  const [searchQuery, setSearchQuery] = useState(""); // 検索クエリ

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });

        // マップ初期化
        if (!map.current) {
          map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [longitude, latitude],
            zoom: 12,
          });

          // 現在地ピンのカスタマイズ
          const currentLocationMarker = document.createElement("div");
          currentLocationMarker.className = "current-location-marker";

          new mapboxgl.Marker(currentLocationMarker)
            .setLngLat([longitude, latitude])
            .setPopup(new mapboxgl.Popup().setHTML("<h3>あなたの現在地</h3>"))
            .addTo(map.current);

          // ナビゲーションコントロール
          const nav = new mapboxgl.NavigationControl();
          map.current.addControl(nav, "top-right");
        }

        // 店舗データを取得
        fetch("/data/stores.json")
          .then((response) => response.json())
          .then((data) => {
            setStoreData(data);

            // 店舗ピンを追加
            data.forEach((store) => {
              const markerElement = document.createElement("div");
              markerElement.className = "store-marker";

              new mapboxgl.Marker(markerElement)
                .setLngLat(store.coordinates)
                .setPopup(
                  new mapboxgl.Popup({ offset: 25 }).setHTML(`
                    <h3>${store.name}</h3>
                    <p>${store.description}</p>
                    <p><strong>営業時間:</strong> ${store.hours}</p>
                  `)
                )
                .addTo(map.current)
                .getElement()
                .addEventListener("click", () => setSelectedStore(store));
            });
          })
          .catch((error) => console.error("Error loading JSON:", error));
      },
      (error) => {
        console.error("現在地の取得に失敗しました: ", error);
      }
    );
  }, []);

  const handleSearch = () => {
    if (!searchQuery) return;

    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        searchQuery
      )}.json?country=JP&access_token=${mapboxgl.accessToken}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.features && data.features.length > 0) {
          const [longitude, latitude] = data.features[0].geometry.coordinates;
          map.current.flyTo({
            center: [longitude, latitude],
            zoom: 14,
          });
        } else {
          alert("該当する場所が見つかりませんでした。");
        }
      })
      .catch((error) => {
        console.error("Geocoding API エラー:", error);
        alert("検索中にエラーが発生しました。");
      });
  };

  const returnToCurrentLocation = () => {
    if (currentLocation) {
      map.current.flyTo({
        center: [currentLocation.longitude, currentLocation.latitude],
        zoom: 14,
      });
    } else {
      alert("現在地を取得できませんでした。");
    }
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* 現在地に戻るボタン */}
      <button
        onClick={returnToCurrentLocation}
        className="current-location-button"
        aria-label="現在地に戻る"
      >
        <i className="fa fa-location-arrow"></i>
      </button>

      {/* 検索バー */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="大阪内の場所を検索"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>検索</button>
      </div>

      {/* マップ */}
      <div
        ref={mapContainer}
        style={{
          width: "100%",
          height: "calc(100vh - 100px)",
        }}
      />

      {/* 店舗情報スライド */}
      {selectedStore && (
        <div className="store-info">
          <h3>{selectedStore.name}</h3>
          <p>{selectedStore.description}</p>
          <p><strong>営業時間:</strong> {selectedStore.hours}</p>

          {/* タグを表示 */}
          <div className="tags">
            {selectedStore.tags.map((tag, index) => (
              <span key={index} className={`tag ${tag}`}>
                {tag}
              </span>
            ))}
          </div>

          {/* Link コンポーネントを使って詳細ページに遷移 */}
          <Link to={`/store/${selectedStore.id}`}>
            <button>詳細ページ</button>
          </Link>

          <button onClick={() => setSelectedStore(null)}>閉じる</button>
        </div>
      )}
    </div>
  );
};

export default MapboxSearch;
