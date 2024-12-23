import { takeLatest, call, put, delay } from "redux-saga/effects";
import { fetchResultsStart, fetchResultsSuccess, fetchResultsFailure, setQuery } from "../reducers/searchSlice";
import axios from "axios";

const API_URL = `${process.env.BACKEND_API}/folders`;


//@ts-expect-error
function* handleSearch(action) {
  try {
    const query = action.payload;

    // Debounce API call
    yield delay(300);

    if (!query) {
      yield put(fetchResultsSuccess([]));
      return;
    }

    yield put(fetchResultsStart());

    //@ts-expect-error
    const response = yield call(axios.get, `${API_URL}?name=${query}`);
    yield put(fetchResultsSuccess(response.data));
  } catch (error) {
    //@ts-expect-error
    yield put(fetchResultsFailure(error?.message));
  }
}

export default function* searchSaga() {
  yield takeLatest(setQuery.type, handleSearch);
}
