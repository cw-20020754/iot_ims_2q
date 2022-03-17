import { API } from 'common/constants';
import axios from 'api/interceptor/imsInterceptor';
import { makeurlQeuryString } from '../common/utils';

export const getProtocol = async (param) => {
  return axios
    .get(makeurlQeuryString(`${API.API_URL}/v1/protocol/api`, param))
    .then((response) => {
      // console.log('@@@ response 222 >> ', JSON.stringify(response));
      return response;
    })
    .catch((err) => {
      if (err.response) return err.response;
    });
};
