

import { api } from 'src/utils/api/axios.configs';
import { ApiRouters } from 'src/utils/api/apiRouters';

export const getVersionApi = () => {
    var url = `${ApiRouters.COMMON}/GetVersionApi`;
    return api.get(url);
};
//#region ADDRESS 
export const getProvinces = () => {
    var url = `${ApiRouters.COMMON}/Provinces`;
    return api.get(url);
};
//#endregion
