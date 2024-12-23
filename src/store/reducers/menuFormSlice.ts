// store/menuSlice.ts
import { TreeNode } from "@/components/Dashboard/FileTree/utils/fileTreeInterface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MenuState {
  menuForm: TreeNode,
  expanded: boolean;
}

const initialState: MenuState = {
  menuForm:{
      id:'',name:'',parentId:'', depth:-1, parentData:'', children:undefined,
  },
  expanded: false,
};

export const menuFormSlice = createSlice({
  name: "menuForm",
  initialState,
  reducers: {
    updateDefaultDataInForm: (state,action:PayloadAction<TreeNode>) => {
      state.expanded = true;
      state.menuForm = action.payload;
    },
    removeForm:(state) => {
      state.expanded = false;
    },
  },
});

export const { updateDefaultDataInForm, removeForm } = menuFormSlice.actions;
export default menuFormSlice.reducer;
