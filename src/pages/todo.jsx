import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TodoApp } from "@/components/Todo";
import { useBgColor } from "@/hooks/useBgColor";
import layoutStyles from "@/styles/Layout.module.scss";
import Head from "next/head";

const Todo = () => {
  const bgColorClass = useBgColor();
  return (
    <>
      <Head>
        <title>Todo Page</title>
      </Head>

      <div className={`${layoutStyles.container} ${bgColorClass}`}>
        <div className={layoutStyles.inner}>
          <Header pageKey="todo" />
        </div>
        <TodoApp />
        <Footer />
      </div>
    </>
  );
};

export default Todo;
