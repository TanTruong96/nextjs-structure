import actions from './actions';
import { getCurrentLanguage } from './config';

const initState = {
  language: getCurrentLanguage(),
  loading: false
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    //#region ADDRESS
    case actions.CHANGE_LANGUAGE:
      return { ...state, language: action.language };
    //#endregion


    default:
      return state;
  }
}
