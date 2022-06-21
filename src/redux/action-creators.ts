import { createAction } from "@reduxjs/toolkit";
import { Book } from "../models/book";

export const loadBooks = createAction<Book[]>("@books/load");
export const setLoading = createAction("@books/set-loading");
