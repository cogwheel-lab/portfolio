import Head from "next/head";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import styles from "@/styles/Home.module.css";

const Home = () => {
  const works = [
    {
      title: "Todoアプリ",
      description: "ただのTodoの練習",
      href: "#",
    },
    {
      title: "コンビニ情報アプリ",
      description: "位置情報、GoogleMapAPIの練習",
      href: "#",
    },
    {
      title: "あみだJS（仮）",
      description: "分岐の練習",
      href: "#",
    },
  ];

  return (
    <>
      <Head>
        <title>cogwheel-lab - Frontend Engineer Portfolio</title>
        <meta name="description" content="フロントエンドエンジニアのポートフォリオ" />
      </Head>

      <div className={styles.container}>
        <div className={styles.inner}>
          <Header />

          {/* Hero Section */}
          <section className={styles.hero}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>cogwheel-lab</h1>
            </div>
          </section>

          {/* Practice Section */}
          <section id="practice" className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Practice</h2>
              <p className={styles.sectionDesc}>学習用作品</p>
            </div>
            <div className={styles.worksGrid}>
              {works.map((work, index) => (
                <div key={index} className={styles.workCard}>
                  <div className={styles.workInfo}>
                    <h3>{work.title}</h3>
                    <p>{work.description}</p>
                    <a href={work.href} className={styles.workLink}>
                      View →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;
