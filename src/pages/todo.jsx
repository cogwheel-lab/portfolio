import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import todoStyles from "@/components/Todo/Todo.module.scss";
import { useStarAnimation } from "@/hooks/useStarAnimation";
import { useTodo } from "@/hooks/useTodo";
import layoutStyles from "@/styles/Layout.module.scss";
import Head from "next/head";
import { useRef } from "react";
import { IoCheckmarkCircle, IoEllipse, IoTrash } from "react-icons/io5";

const Todo = () => {
  const addButtonRef = useRef(null);
  const { triggerStars } = useStarAnimation();

  const {
    text,
    todos,
    nextId,
    handleAdd,
    handleChange,
    handleDelete,
    handleToggle,
  } = useTodo();

  const handleAddWithStars = () => {
    if (addButtonRef.current) {
      const rect = addButtonRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      triggerStars(x, y);
    }
    handleAdd();
  };

  return (
    <>
      <Head>
        <title>Todo Page</title>
      </Head>

      <div className={layoutStyles.container}>
        <div className={layoutStyles.inner}>
          <Header pageKey="todo" />
          <div className={todoStyles.inner}>
            <div className={todoStyles.inputArea}>
              <input
                type="text"
                value={text}
                onChange={handleChange}
                placeholder="やることを入力..."
              />
              <button
                ref={addButtonRef}
                onClick={handleAddWithStars}
              >
                追加
              </button>
            </div>
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
                        className={
                          item.completed ? todoStyles.textcompleted : ""
                        }
                      >
                        {item.text}
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
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Todo;
