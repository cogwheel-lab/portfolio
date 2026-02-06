import "@/styles/globals.scss";
import Head from "next/head";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="/images/Gemini_Generated_Image_d1y7jtd1y7jtd1y7 (1).png"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
};
export default App;
