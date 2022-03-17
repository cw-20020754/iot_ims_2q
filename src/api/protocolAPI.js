import { API } from 'common/constants';
import axios from 'api/interceptor/imsInterceptor';
import { makeurlQeuryString } from '../common/utils';

export const getProtocol = async (param) => {
  return axios
    .get(makeurlQeuryString(`${API.API_URL}/v1/protocol/api`, param))
    .then((response) => {
      return response;
    });
};
