import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  driver: {
    id: null,
    name: null,
    phone: null,
    status: null,
    carName: null,
    carType: null,
    carLicense: null,
    currentAddress: null,
  },
  authorized: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    clearStore: () => initialState,
    setDriver: (state, action) => {
      state.driver = action.payload;
    },
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

export const { clearStore, setDriver, setAuthorized } = appSlice.actions;
export default appSlice.reducer;
