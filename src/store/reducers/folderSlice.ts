import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TreeNode } from "@/components/Dashboard/FileTree/utils/fileTreeInterface";

interface FolderState {
  folders: TreeNode[];
  loading: boolean;
  error: string | null;
}

const initialState: FolderState = {
  folders: [{id:'', parentId:'', name:"", parentData:"", depth:-1}],
  loading: false,
  error: null,
};

const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    fetchFoldersRequest(state,action) {
      console.log(action)
      state.loading = true;
      state.error = null;
    },
    fetchFoldersSuccess(state, action: PayloadAction<TreeNode[]>) {
      state.folders = action.payload;
      state.loading = false;
    },
    fetchFoldersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addFolderRequest(state, action: PayloadAction<TreeNode>) {
      console.log(action)
      state.loading = true;
    },
    addFolderSuccess(state, action: PayloadAction<TreeNode[]>) {
      state.loading = false;
      // Recursive addition of children are handled by BE
      state.folders = action.payload;
    },
    addFolderFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteFolderRequest(state, action: PayloadAction<string>) {
      console.log(action)
      state.loading = true;
    },
    deleteFolderSuccess(state, action: PayloadAction<string>) {

      const deleteFolderRecursive = (folders: TreeNode[], folderId: string): TreeNode[] => {
        return folders
          .filter((folder) => folder.id !== folderId)
          .map((folder) => ({
            ...folder,
            children: deleteFolderRecursive(folder.children || [], folderId),
          }));
      };
      state.folders = deleteFolderRecursive(state.folders, action.payload);
      state.loading = false;
    },
    deleteFolderFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchFoldersRequest,
  fetchFoldersSuccess,
  fetchFoldersFailure,
  addFolderRequest,
  addFolderSuccess,
  addFolderFailure,
  deleteFolderRequest,
  deleteFolderSuccess,
  deleteFolderFailure,
} = folderSlice.actions;

export default folderSlice.reducer;
