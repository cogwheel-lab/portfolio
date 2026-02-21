// src/hooks/useTodo.jsx
import { useCallback, useEffect, useState } from "react";

export const useTodo = () => {
  const saveTodos = useCallback((todosArray) => {
    try {
      localStorage.setItem("todos", JSON.stringify(todosArray));
    } catch (error) {
      console.log("localStorage保存エラー:", error);
    }
  }, []);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [nextId, setNextId] = useState(1);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("todos");
      if (saved) {
        const savedTodos = JSON.parse(saved);
        setTodos(JSON.parse(saved));
        if (savedTodos.length > 0) {
          const maxId = Math.max(...savedTodos.map((todo) => todo.id));
          setNextId(maxId + 1);
        }
      }
    } catch (error) {
      console.log("localStorage読み込みエラー:", error);
    }
  }, []);

  const handleAdd = useCallback(() => {
    setTodos((prevArray) => {
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
    setText("");
  }, [text, nextId, saveTodos]);
  const handleChange = useCallback(
    (e) => {
      setText(e.target.value);
    },
    [saveTodos],
  );
  const handleDelete = useCallback(
    (id) => {
      setTodos((prevTodos) => {
        const newTodos = prevTodos.filter((todo) => todo.id !== id);
        saveTodos(newTodos);
        return newTodos;
      });
    },
    [saveTodos],
  );
  const handleToggle = useCallback(
    (id) => {
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
    },
    [saveTodos],
  );
  const handlePreset = (presetArray) => {
    const todosWithId = presetArray.map((item, index) => ({
      id: nextId + index,
      text: item.text,
      completed: item.completed,
    }));
    setTodos((prevArray) => {
      const newTodos = [...prevArray, ...todosWithId];
      saveTodos(newTodos);
      return newTodos;
    });
    setNextId((prevId) => prevId + presetArray.length);
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
