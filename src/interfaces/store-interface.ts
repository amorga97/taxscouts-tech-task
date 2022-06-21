import { Book } from "../models/book";

export interface ifBookSearchStore {
  isLoading: boolean;
  results: Book[];
}
