import { configureStore } from "@reduxjs/toolkit";
import { bookSearchReducer } from "./book-search/reducer";

export const store = configureStore({
  reducer: { bookSearch: bookSearchReducer },
});
