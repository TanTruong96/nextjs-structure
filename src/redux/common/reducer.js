import actions from './actions';

const initState = {
  provinces: [],
  versionApi: "0",
  loading: false
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    
    case actions.GET_VERSION_API_SUCCESS: {
      let { data } = action.payload;
      return { ...state, versionApi: data };
    }
    //#region ADDRESS
    case actions.GET_PROVINCE_COMMON_SUCCESS: {
      let { data } = action.payload;
      let res = data ? data : [];
      return { ...state, provinces: res };
    }
    //#endregion


    default:
      return state;
  }
}
