import { combineReducers } from 'redux';
import Auth from 'src/redux/auth/reducer';
import Common from 'src/redux/common/reducer';
import Language from 'src/redux/language/reducer';

export default combineReducers({
    Auth,
    Common,
    Language
});