import { createReducer } from "@reduxjs/toolkit";
import { ifStore } from "../../interfaces/store-interface";
import * as actions from "./action-creators";

const initialState: ifStore = { isLoading: false, results: [] };

export const bookSearchReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.loadBooks, (state, action) => {
      return { ...state, isLoading: false, results: action.payload };
    })
    .addCase(actions.setLoading, (state) => ({
      ...state,
      isLoading: true,
    }))
    .addDefaultCase((state) => state);
});
