import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { works } from "@/lib/works";
import styles from "@/styles/Home.module.scss";
import layoutStyles from "@/styles/Layout.module.scss";
import Head from "next/head";
import Link from "next/link";

const Home = () => {
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
                <Link
                  key={index}
                  className={styles.workCard}
                  href={work.href}
                >
                  <div className={styles.workInfo}>
                    <h3>{work.title}</h3>
                    <p>{work.description}</p>
                    <span>View →</span>
                  </div>
                </Link>
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
