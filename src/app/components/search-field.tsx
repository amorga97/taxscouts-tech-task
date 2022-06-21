import { useState } from "react";

export function SearchField() {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (text: string) => {
    setInputValue(text);
  };

  return (
    <input
      type="text"
      placeholder="search book"
      value={inputValue}
      onChange={(ev) => {
        handleChange(ev.target.value);
      }}
    />
  );
}
