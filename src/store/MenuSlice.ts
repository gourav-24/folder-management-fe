// store/menuSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MenuState {
  expanded: boolean;
}

const initialState: MenuState = {
  expanded: true,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.expanded = !state.expanded;
    },
  },
});

export const { toggleMenu } = menuSlice.actions;
export default menuSlice.reducer;
