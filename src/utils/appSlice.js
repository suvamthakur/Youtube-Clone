import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    isMenuOpen: true,
    isLoading: false,
  },
  reducers: {
    openMenu: (state) => {
      state.isMenuOpen = true;
    },
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
    setLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
  },
});

export const { toggleMenu, closeMenu, openMenu, setLoading } = appSlice.actions;
export default appSlice.reducer;
