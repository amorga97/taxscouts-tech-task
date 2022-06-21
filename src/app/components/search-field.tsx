import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/use-debounce";

export function SearchField({
  updateInputValue,
}: {
  updateInputValue: (text: string) => void;
}) {
  const [inputValue, setInputValue] = useState("");
  const delay = 300;
  const debouncedSearchText = useDebounce(inputValue, delay);

  const handleChange = (text: string) => {
    setInputValue(text);
  };

  useEffect(() => {
    updateInputValue(debouncedSearchText);
  }, [debouncedSearchText, updateInputValue]);

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
