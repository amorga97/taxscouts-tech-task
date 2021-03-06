import { createAction } from "@reduxjs/toolkit";
import { Book } from "../../models/book";

export const loadResults = createAction<Book[]>("@books/load");
export const toggleLoading = createAction("@books/toggle-loading");
