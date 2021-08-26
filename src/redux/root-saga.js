import { all } from 'redux-saga/effects';
import auth from 'src/redux/auth/saga';
import common from 'src/redux/common/saga';

export default function* rootSaga(getState) {
    yield all([
        auth(),
        common(),
    ])
};