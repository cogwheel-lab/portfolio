import { useCallback, useState } from "react";

export const useTodo = () => {
  const [text, setText] = useState("");
  // const [todos, setTodos] = useState([]);
  const [todos, setTodos] = useState([
    { id: 1, text: "牛乳を買う", completed: false },
    { id: 2, text: "レポートを提出する", completed: true },
    { id: 3, text: "ジムに行く", completed: false },
  ]);
  const [nextId, setNextId] = useState(4);
  // const [nextId, setNextId] = useState(1);
  const handleAdd = useCallback(() => {
    setTodos((prevArray) => {
      if (prevArray.some((todos) => todos.text === text)) {
        alert("同じのがあるよ");
        return prevArray;
      }
      const newTodos = [
        ...prevArray,
        {
          id: nextId,
          text: text,
          completed: false,
        },
      ];
      return newTodos;
    });
    setNextId((prevId) => prevId + 1);
  }, [text, nextId]);
  const handleChange = useCallback((e) => {
    setText(e.target.value);
  }, []);
  const handleDelete = useCallback((id) => {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.filter((todo) => todo.id !== id);
      return newTodos; // 明示的に「新しい配列」と分かる
    });
  }, []);
  const handleToggle = useCallback((id) => {
    // console.log("ハンドルだよー：", id);
    // console.log("ハンドルだよー：", todos[id - 1].completed);
    setTodos((prevTodos) => {
      // id番号のチェックをオンオフ
      return prevTodos.map((todo) => {
        // ← return 1
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed }; // ← return 2
        }
        return todo; // ← return 3
      });
    });
  }, []);
  return {
    text,
    todos,
    nextId,
    handleAdd,
    handleChange,
    handleDelete,
    handleToggle,
  };
};
