import { call, put, takeLatest, } from "redux-saga/effects";
import axios from "axios";
import {
  fetchFoldersRequest,
  fetchFoldersSuccess,
  fetchFoldersFailure,
  addFolderRequest,
  addFolderSuccess,
  addFolderFailure,
  deleteFolderRequest,
  deleteFolderSuccess,
  deleteFolderFailure,
} from "../reducers/folderSlice";

const API_URL = `${process.env.BACKEND_API}/folders`;

function* fetchFolders(action:ReturnType<typeof fetchFoldersRequest>) {
  try {
    console.log("API_URL============== ", API_URL);
    console.log("process.env.BACKEND_API============== ", process.env.BACKEND_API);
    let url = API_URL;
    if(action.payload){
      url+=`/${action.payload}`;
    }
    //@ts-expect-error description
    const response = yield call(axios.get, url);
    yield put(fetchFoldersSuccess(response.data));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(fetchFoldersFailure(error.mesage));
  }
}

function* addFolder(action: ReturnType<typeof addFolderRequest>) {
  try {
    //@ts-expect-error description
    const response = yield call(axios.post, API_URL, action.payload);
    yield put(addFolderSuccess(response.data));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(addFolderFailure(error.message));
  }
}

function* deleteFolder(action: ReturnType<typeof deleteFolderRequest>) {
  try {
    yield call(axios.delete, `${API_URL}/${action.payload}`);
    yield put(deleteFolderSuccess(action.payload));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(deleteFolderFailure(error.message));
  }
}

export default function* folderSaga() {
  yield takeLatest(fetchFoldersRequest.type, fetchFolders);
  yield takeLatest(addFolderRequest.type, addFolder);
  yield takeLatest(deleteFolderRequest.type, deleteFolder);
}

