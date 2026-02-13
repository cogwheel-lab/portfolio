// src/hooks/useTodo.jsx
import { useCallback, useEffect, useState } from "react";

export const useTodo = () => {
  const saveTodos = (todosArray) => {
    try {
      localStorage.setItem("todos", JSON.stringify(todosArray));
    } catch (error) {
      console.log("localStorage保存エラー:", error);
    }
  };
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([
    { id: 1, text: "牛乳を買う", completed: false },
    { id: 2, text: "レポートを提出する", completed: true },
    { id: 3, text: "ジムに行く", completed: false },
  ]);
  const [nextId, setNextId] = useState(4);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("todos");
      if (saved) {
        setTodos(JSON.parse(saved));
      }
    } catch (error) {
      console.log("localStorage読み込みエラー:", error);
    }
  }, []);

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
      saveTodos(newTodos);
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
      saveTodos(newTodos);
      return newTodos; // 明示的に「新しい配列」と分かる
    });
  }, []);
  const handleToggle = useCallback((id) => {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      saveTodos(newTodos);
      return newTodos;
    });
  }, []);
  const handlePreset = (presetArray) => {
    const todosWithID = presetArray.map((item, index) => ({
      id: nextID + index,
      text: item.text,
      completed: item.completed,
    }));
    setTodos = [...todos, ...todosWithID];
    saveTodos = [...todos, ...todosWithID];
  };

  return {
    text,
    todos,
    nextId,
    handleAdd,
    handleChange,
    handleDelete,
    handleToggle,
    handlePreset,
  };
};
