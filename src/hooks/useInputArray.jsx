import { useCallback, useState } from "react";

export const useInputArray = () => {
  const [text, setText] = useState("");
  const [array, setArray] = useState([]);
  const handleAdd = useCallback(() => {
    setArray((prevArray) => {
      if (prevArray.includes(text)) {
        alert("同じのがあるよ");
        return prevArray;
      }
      return [...prevArray, text];
    });
  }, [text]);
  const handleChange = useCallback((e) => {
    if (e.target.value.length >= 5) {
      alert(e.target.value);
    }
    setText(e.target.value.trim());
  }, []);
  return { text, array, handleAdd, handleChange };
};
