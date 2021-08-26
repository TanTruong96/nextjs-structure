const actions = {

  GET_VERSION_API: 'GET_VERSION_API',
  GET_VERSION_API_SUCCESS: 'GET_VERSION_API_SUCCESS',
  getVersionApi: () => ({
    type: actions.GET_VERSION_API,
  }),

  //#region  ADDRESS
  GET_PROVINCE_COMMON: 'GET_PROVINCE_COMMON',
  GET_PROVINCE_COMMON_SUCCESS: 'GET_PROVINCE_COMMON_SUCCESS',
  getProvinces: () => ({
    type: actions.GET_PROVINCE_COMMON,
  }),
  //#endregion

  COMMON_RESPONSE_ERROR: 'COMMON_RESPONSE_ERROR'
};
export default actions;
