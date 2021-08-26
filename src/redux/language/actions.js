import { getCurrentLanguage } from './config';
const actions = {
  //#region  ADDRESS
  CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
  changeLanguage: language => ({
    type: actions.CHANGE_LANGUAGE,
    language: getCurrentLanguage(language),
  }),

  //#endregion

};
export default actions;
