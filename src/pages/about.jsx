import Head from "next/head";
import { Footer } from "src/components/Footer";
import { Header } from "src/components/Header";
import { Main } from "src/components/Main";
import styles from "src/styles/Home.module.scss";

const About = (props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>About Page</title>
      </Head>
      <Header />
      {props.isShow ? <h2>{props.doubleCount}</h2> : null}
      <button onClick={props.handleClick}>ボタン</button>
      <button onClick={props.handleDisplay}>
        {props.isShow ? "非表示" : "表示"}
      </button>
      <input
        type="text"
        value={props.text}
        onChange={props.handleChange}
      />
      <button onClick={props.handleAdd}>追加</button>
      <ul>
        {props.array.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
      <Main page="about" />

      <Footer />
    </div>
  );
};
export default About;
