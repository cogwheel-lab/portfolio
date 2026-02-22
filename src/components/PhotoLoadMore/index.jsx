import photoStyles from "@/components/PhotoLoadMore/PhotoLoadMore.module.scss";

export const PhotoLoadMore = ({ loadCount, photos, setLoadCount }) => {
  return (
    <>
      <section className={photoStyles.section}>
        {/* <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Unsplash API</h2>
        </div> */}
        <div className={photoStyles.photobox}>
          {photos.map((photo) => (
            <div key={photo.id}>
              <img
                src={`${photo.urls.raw}&fit=crop&w=400&h=400`}
                alt={photo.alt_description}
              />
              <p className={photoStyles.photocredit}>
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
            className={photoStyles.loadMoreButton}
          >
            もっと見る
          </button>
        )}
        <p className={photoStyles.attention}>
          もっと見るボタンはおひとりさま1時間2回まで押すことができます
        </p>
        <p className={photoStyles.buttonCount}>
          ボタンを押した回数: {loadCount}回
        </p>
      </section>
    </>
  );
};
