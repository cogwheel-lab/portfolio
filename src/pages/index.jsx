import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { unsplash } from "@/lib/unsplash";
import styles from "@/styles/Home.module.scss";
import layoutStyles from "@/styles/Layout.module.scss";
import Head from "next/head";
import { useEffect, useState } from "react";

const Home = () => {
  const [photos, setPhotos] = useState([]); // 取得した写真を保存する箱
  const [page, setPage] = useState(1);
  const works = [
    {
      title: "Todoアプリ",
      description: "ただのTodoの練習",
      href: "/todo",
    },
    {
      title: "コンビニナビ",
      description: "位置情報、GoogleMapAPIの練習",
      href: "#",
    },
    {
      title: "なんとか診断",
      description: "分岐の練習",
      href: "#",
    },
    // {
    //   title: "あみだくじ",
    //   description: "分岐の練習",
    //   href: "#",
    // },
    {
      title: "一問一答",
      description: "Groq API",
      href: "#",
    },
  ];

  // 画像取得のロジックをここに統合
  useEffect(() => {
    unsplash.search
      .getPhotos({
        query: "nature",
        page: page,
        perPage: 3, // まずは3枚表示してみる
      })
      .then((result) => {
        if (result.response) {
          console.log("取得した画像データ:", result.response.results);
          setPhotos((prevPhotos) => [
            ...prevPhotos,
            ...result.response.results,
          ]); // 既存の写真に追加
        }
      });
  }, [page]);

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
              {/* <p className={styles.sectionDesc}>学習用作品</p> */}
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
            <h3>新着順または閲覧履歴からのおすすめ</h3>
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
            {page < 3 && (
              <button
                onClick={() => {
                  setPage(page + 1);
                  const current = localStorage.getItem("clickCount") || "0";
                  const newCount = Number(current) + 1;
                  const data = {
                    count: newCount,
                    time: new Date().toISOString(),
                  };

                  // localStorage.setItem("clickCount", String(newCount));
                  localStorage.setItem("clickData", JSON.stringify(data));
                }}
              >
                もっと見る
              </button>
            )}
            <p className={styles.attention}>
              もっと見るボタンはおひとりさま1時間2回までです
            </p>
          </section>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;
