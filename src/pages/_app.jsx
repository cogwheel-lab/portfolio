import "@/styles/globals.scss";
import { Noto_Sans_JP } from "next/font/google";
import Head from "next/head";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link
          rel="icon"
          href="/images/logo.png"
        />
      </Head>
      <main className={notoSansJP.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
};
export default App;
