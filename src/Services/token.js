import axios from 'axios';
import url from './url';

const refreshToken = async (accessToken, refreshToken) => {
  const res = await axios.get(`${url}/user/session/refresh`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
      'x-refresh': `${refreshToken}`
    }
  });
  return res;
};

const exportObj = {
  refreshToken
};

export default exportObj;
