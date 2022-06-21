import { Book } from "../models/book";

export interface ifStore {
  isLoading: boolean;
  results: Book[];
}
