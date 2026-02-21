import todoStyles from "@/components/Todo/Todo.module.scss";
import { useStarAnimation } from "@/hooks/useStarAnimation";
import { useTodo } from "@/hooks/useTodo";
import { useRef } from "react";
import { IoCheckmarkCircle, IoEllipse, IoTrash } from "react-icons/io5";

export const TodoApp = () => {
  const addButtonRef = useRef(null);
  const { triggerStars } = useStarAnimation();
  const presetTodos = [
    { text: "朝食を食べる", completed: false },
    { text: "メールをチェックする", completed: false },
    { text: "1時間勉強する", completed: false },
  ];
  const {
    text,
    todos,
    nextId,
    handleAdd,
    handleChange,
    handleDelete,
    handleToggle,
    handlePreset,
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
                    className={item.completed ? todoStyles.textcompleted : ""}
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
      <button
        onClick={() => handlePreset(presetTodos)}
        className={todoStyles.presetButton}
      >
        プリセットを追加
      </button>
    </>
  );
};

export default TodoApp;
