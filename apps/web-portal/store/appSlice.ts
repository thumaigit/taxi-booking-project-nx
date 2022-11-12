import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  authorized: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    clearStore: () => initialState,
    setAuthorized: (state, action: PayloadAction<boolean>) => {
      state.authorized = action.payload;
    },
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.app,
      };
    },
  },
});

export const { clearStore, setAuthorized } = appSlice.actions;
export default appSlice.reducer;
