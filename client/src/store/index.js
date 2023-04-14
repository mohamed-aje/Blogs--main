import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSclice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: {
    signin(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("token");
      state.isLoggedIn = false;
    },
    getLoggedUser() {
      const loggedUserJSON = window.localStorage.getItem("token");
      if (loggedUserJSON) {
        return JSON.parse(loggedUserJSON);
      }
    },
  },
});

export const authActions = authSclice.actions;

export const store = configureStore({
  reducer: authSclice.reducer,
});
