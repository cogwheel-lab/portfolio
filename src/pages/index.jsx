import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { unsplash } from "@/lib/unsplash";
import styles from "@/styles/Home.module.scss";
import layoutStyles from "@/styles/Layout.module.scss";
import Head from "next/head";
import { useEffect, useState } from "react";

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [loadCount, setLoadCount] = useState(0);
  const works = [
    {
      title: "Todoアプリ",
      description: "ただのTodoの練習",
      href: "/todo",
    },
    {
      title: "なんとか診断",
      description: "分岐の練習",
      href: "#",
    },
  ];

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

  return (
    <>
      <Head>
        <title>cogwheel-lab - Frontend Engineer Portfolio</title>
        <meta
          name="description"
          content="フロントエンドエンジニアのポートフォリオ"
        />
      </Head>

      <div className={layoutStyles.container}>
        <div className={layoutStyles.inner}>
          <Header pageKey="top" />

          {/* Practice Section */}
          <section
            id="practice"
            className={styles.section}
          >
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Practice</h2>
            </div>
            <div className={styles.worksGrid}>
              {works.map((work, index) => (
                <div
                  key={index}
                  className={styles.workCard}
                >
                  <div className={styles.workInfo}>
                    <h3>{work.title}</h3>
                    <p>{work.description}</p>
                    <a
                      href={work.href}
                      className={styles.workLink}
                    >
                      View →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Unsplash API</h2>
              <p>現在の読み込み回数: {loadCount}回</p>
            </div>
            <div className={styles.photobox}>
              {photos.map((photo) => (
                <div key={photo.id}>
                  <img
                    src={`${photo.urls.raw}&fit=crop&w=400&h=400`}
                    alt={photo.alt_description}
                  />
                  <p className="text-xs text-gray-500">
                    Photo by {photo.user.name} on Unsplash
                  </p>
                </div>
              ))}
            </div>
            {loadCount < 2 && (
              <button
                onClick={() => {
                  setLoadCount(loadCount + 1);
                  const current = localStorage.getItem("clickData"); //保存されてるのをとってくる
                  const obj = current
                    ? JSON.parse(current)
                    : { loadCount: 0, time: new Date().toISOString() };
                  const hourPassed = new Date() - new Date(obj.time) > 3600000;
                  const currentCount = hourPassed ? 0 : obj.loadCount;
                  const newCount = currentCount + 1;
                  const data = {
                    loadCount: newCount,
                    time: new Date().toISOString(),
                    photos: photos,
                  };
                }}
                className={styles.loadMoreButton}
              >
                もっと見る
              </button>
            )}
            <p className={styles.attention}>
              もっと見るボタンはおひとりさま1時間2回まで押すことができます
            </p>
          </section>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;
