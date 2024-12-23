import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import folderReducer from "./reducers/folderSlice";
import menuFormReducer from "./reducers/menuFormSlice";
import folderSaga from "./saga/folderSaga";
import searchReducer from "./reducers/searchSlice";
import searchSaga from "./saga/searchSaga";
import { all, fork } from "redux-saga/effects";

const sagaMiddleware = createSagaMiddleware();
function* rootSaga() {
  yield all([
    fork(searchSaga),   
    fork(folderSaga), 
  ]);
}

const store = configureStore({
  reducer: {
    folder: folderReducer,
    menuFormData: menuFormReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;