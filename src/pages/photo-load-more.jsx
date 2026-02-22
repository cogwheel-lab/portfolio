import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PhotoLoadMore } from "@/components/PhotoLoadMore";
import { usePhotoLoadMore } from "@/hooks/usePhotoLoadMore";
import layoutStyles from "@/styles/Layout.module.scss";
import Head from "next/head";

const PhotoLoad = () => {
  const { photos, loadCount, setLoadCount } = usePhotoLoadMore();

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

          <PhotoLoadMore
            loadCount={loadCount}
            photos={photos}
            setLoadCount={setLoadCount}
          />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default PhotoLoad;
