import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import actions from './actions';
import * as services from 'src/services/common';

export function* getVersionApi() {
  yield takeEvery(actions.GET_VERSION_API, function* ({ payload }) {
    try {
      var response = yield call(services.getVersionApi);
      if (response.data.success === true) {
        var { data } = response.data.data;
        yield put({
          type: actions.GET_VERSION_API_SUCCESS,
          payload: { data }
        })
      }
    } catch (e) {
      yield put({ type: actions.GET_VERSION_API_ERROR, })
    }
  })
}

//#region ADDRESS
export function* getProvinces() {
  yield takeEvery(actions.GET_PROVINCE_COMMON, function* ({ payload }) {
    try {
      var response = yield call(services.getProvinces);
      if (response.data.success === true) {
        var { data } = response.data.data;
        yield put({
          type: actions.GET_PROVINCE_COMMON_SUCCESS,
          payload: { data }
        })
      }
    } catch (e) {
      yield put({ type: actions.COMMON_RESPONSE_ERROR })
    }
  })
}
//#endregion

export default function* rootSaga() {
  yield all([
    fork(getVersionApi),
    fork(getProvinces),
  ]);
}
