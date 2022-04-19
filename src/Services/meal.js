import axios from 'axios';
import url from './url';
import TokenService from './token';

const postMeal = async (token, meal) => {
  const refreshToken = localStorage.getItem('refreshToken');
  const checkIfTokenValid = await TokenService.refreshToken(token, refreshToken);

  if (checkIfTokenValid.data.newAccessToken) {
    token = checkIfTokenValid.data.newAccessToken;
  }
  const res = await axios.post(`${url}/user/meal`, meal, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  });
  return res;
};

const exportObj = {
  postMeal
};

export default exportObj;
