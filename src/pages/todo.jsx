import { useTodo } from "@/hooks/useTodo";
import Head from "next/head";
import { IoCheckmarkCircle, IoEllipse, IoTrash } from "react-icons/io5";
import { Footer } from "src/components/Footer";
import { Header } from "src/components/Header";
import todoStyles from "src/components/Todo/Todo.module.scss";
import styles from "src/styles/Home.module.css";
const Todo = () => {
  const {
    text,
    todos,
    nextId,
    handleAdd,
    handleChange,
    handleDelete,
    handleToggle,
  } = useTodo();
  return (
    <div className={styles.container}>
      <Head>
        <title>Todo Page</title>
      </Head>
      <Header />
      <input
        type="text"
        value={text}
        onChange={handleChange}
      />
      <button onClick={handleAdd}>追加</button>
      {todos.length > 0 && (
        <ul className={todoStyles.todoList}>
          {todos.map((item) => {
            return (
              <li
                key={item.id}
                className={todoStyles.todoItem}
                onClick={() => handleToggle(item.id)}
              >
                {/* チェックアイコン（状態によって切り替え） */}
                <button className={todoStyles.icon}>
                  {item.completed ? <IoCheckmarkCircle /> : <IoEllipse />}
                </button>
                <span
                  className={item.completed ? todoStyles.textcompleted : ""}
                >
                  {item.text} {item.completed}
                </span>
                <button
                  className={`${todoStyles.icon} ${todoStyles.iconDelete}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item.id);
                  }}
                >
                  <IoTrash />
                </button>
              </li>
            );
          })}
        </ul>
      )}
      {/* <Main page="index" /> */}

      <Footer />
    </div>
  );
};
export default Todo;
