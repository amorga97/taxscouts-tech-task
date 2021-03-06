import { useState } from "react";
import { SearchField } from "./search-field/search-field";
import { SearchResults } from "./search-results/search-results";

export function QuickSearch() {
  const [inputValue, setInputValue] = useState("");

  const updateInputValue = (text: string) => {
    setInputValue(text);
  };
  return (
    <>
      <SearchField updateInputValue={updateInputValue} />
      <SearchResults searchInput={inputValue} />
    </>
  );
}
