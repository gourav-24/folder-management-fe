import { TreeNode } from "@/components/Dashboard/FileTree/utils/fileTreeInterface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface searchState {
  query:string,
  results:TreeNode[],
  loading:boolean,
  error:string,
}

const initialState:searchState = {
  query: "",
  results: [],
  loading: false,
  error: '',
}

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery(state, action:PayloadAction<string>) {
      state.query = action.payload;
    },
    fetchResultsStart(state) {
      state.loading = true;
    },
    fetchResultsSuccess(state, action:PayloadAction<[]>) {
      state.results = action.payload;
      state.loading = false;
    },
    fetchResultsFailure(state, action:PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setQuery,
  fetchResultsStart,
  fetchResultsSuccess,
  fetchResultsFailure,
} = searchSlice.actions;

export default searchSlice.reducer;
