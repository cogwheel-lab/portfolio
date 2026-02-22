// src/hooks/useTodo.jsx
import { unsplash } from "@/lib/unsplash";
import { useEffect, useState } from "react";

export const usePhotoLoadMore = () => {
  const [photos, setPhotos] = useState([]);
  const [loadCount, setLoadCount] = useState(0);

  // 初回読み込み時にlocalStorageから1時間経ったかロジック
  useEffect(() => {
    const saved = localStorage.getItem("clickData");
    if (saved) {
      const date = JSON.parse(saved);
      const hourPassed = new Date() - new Date(date.time) > 3600000;
      // 1時間以内
      if (!hourPassed) {
        setLoadCount(date.loadCount);
        setPhotos(date.photos || []);
      } else {
        // 1時間以上でデータ削除
        localStorage.removeItem("clickData");
        // 初回訪問の処理
        localStorage.setItem(
          "clickData",
          JSON.stringify({
            loadCount: 0,
            time: new Date().toISOString(),
            photos: [],
          }),
        );
      }
    } else {
      //※savedがnullの場合＝初回訪問
      localStorage.setItem(
        "clickData",
        JSON.stringify({
          loadCount: 0,
          time: new Date().toISOString(),
          photos: [],
        }),
      );
    }
  }, []);
  // 画像取得のロジック
  useEffect(() => {
    // 保存済みデータがある場合はスキップ;
    const saved = localStorage.getItem("clickData");
    if (saved) {
      const data = JSON.parse(saved);
      if (data.photos && data.photos.length >= (loadCount + 1) * 3) {
        return;
      }
    }

    unsplash.search
      .getPhotos({
        query: "nature",
        page: loadCount + 1, // pageはUnsplash API
        perPage: 3, //  perPageはUnsplash API。3枚表示してみる
      })
      .then((result) => {
        if (result.response) {
          const filteredPhotos = result.response.results.map((photo) => ({
            id: photo.id,
            urls: { raw: photo.urls.raw },
            alt_description: photo.alt_description,
            user: { name: photo.user.name },
          }));

          setPhotos((prevPhotos) => [...prevPhotos, ...filteredPhotos]); // 既存の写真に追加
          const currentData = localStorage.getItem("clickData");
          const obj = currentData
            ? JSON.parse(currentData)
            : { loadCount: 0, time: new Date().toISOString(), photos: [] };
          obj.photos = [...(obj.photos || []), ...filteredPhotos];
          obj.loadCount = loadCount;
          localStorage.setItem("clickData", JSON.stringify(obj));
        }
      });
  }, [loadCount]);
  return {
    photos,
    loadCount,
    setLoadCount,
  };
};
