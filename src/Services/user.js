import axios from 'axios';
import url from './url';
import TokenService from './token';

const login = async (user) => {
  const { email, password } = user;
  const res = await axios.post(`${url}/user/session`, {
    email,
    password,
  });
  return res;
};

const register = async (user) => {
  const { email, password, firstName, lastName } = user;

  const res = await axios.post(`${url}/user`, {
    email, 
    password, 
    firstName, 
    lastName 
  });
  return res;
};

const getMe = async (token) => {
  const refreshToken = localStorage.getItem('refreshToken');
  const checkIfTokenValid = await TokenService.refreshToken(token, refreshToken);

  if (checkIfTokenValid.data.newAccessToken) {
    token = checkIfTokenValid.data.newAccessToken;
  }
  const res = await axios.get(`${url}/user/profile/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  });
  return res;
};

const updateUserDetails = async (token, user) => {
  const refreshToken = localStorage.getItem('refreshToken');
  const checkIfTokenValid = await TokenService.refreshToken(token, refreshToken);

  if (checkIfTokenValid.data.newAccessToken) {
    token = checkIfTokenValid.data.newAccessToken;
  }
  const res = await axios.put(`${url}/user/details/update`, user, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  });
  return res;
};

const updateUserPassword = async (token, details) => {
  const { originalPassword, newPassword } = details;
  const refreshToken = localStorage.getItem('refreshToken');
  const checkIfTokenValid = await TokenService.refreshToken(token, refreshToken);

  if (checkIfTokenValid.data.newAccessToken) {
    token = checkIfTokenValid.data.newAccessToken;
  }
  const res = await axios.put(`${url}/user/details/password`, { originalPassword, newPassword }, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  });
  return res;
};

const getUserPainLevelForTimePeriod = async (token, time) => {
  const refreshToken = localStorage.getItem('refreshToken');
  const checkIfTokenValid = await TokenService.refreshToken(token, refreshToken);

  if (checkIfTokenValid.data.newAccessToken) {
    token = checkIfTokenValid.data.newAccessToken;
  }
  const res = await axios.get(`${url}/user/meals/pain/${time}`, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  });
  return res;
};

const getUserPainLevelByMealType = async (token) => {
  const refreshToken = localStorage.getItem('refreshToken');
  const checkIfTokenValid = await TokenService.refreshToken(token, refreshToken);

  if (checkIfTokenValid.data.newAccessToken) {
    token = checkIfTokenValid.data.newAccessToken;
  }
  const res = await axios.get(`${url}/user/meals/type/pain`, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  });
  return res;
};

const getAmountOfMealsByTimePeriod = async (token, time) => {
  const refreshToken = localStorage.getItem('refreshToken');
  const checkIfTokenValid = await TokenService.refreshToken(token, refreshToken);

  if (checkIfTokenValid.data.newAccessToken) {
    token = checkIfTokenValid.data.newAccessToken;
  }
  const res = await axios.get(`${url}/user/meals/amount/${time}`, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  });
  return res;
};

const getMostCommonPainLevelFood = async (token) => {
  const refreshToken = localStorage.getItem('refreshToken');
  const checkIfTokenValid = await TokenService.refreshToken(token, refreshToken);

  if (checkIfTokenValid.data.newAccessToken) {
    token = checkIfTokenValid.data.newAccessToken;
  }
  const res = await axios.get(`${url}/user/meals/worstPain`, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  });
  return res;
};

const updateProfilePicture = async (token, file) => {

  let formData = new FormData();
  formData.append('file', file);
  const refreshToken = localStorage.getItem('refreshToken');
  const checkIfTokenValid = await TokenService.refreshToken(token, refreshToken);

  if (checkIfTokenValid.data.newAccessToken) {
    token = checkIfTokenValid.data.newAccessToken;
  }
  const res = await axios.put(`${url}/user/profile/photo`, formData, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  });
  return res;
};

const exportObj = {
  login,
  register,
  getMe,
  updateUserDetails,
  updateUserPassword,
  getUserPainLevelForTimePeriod,
  getUserPainLevelByMealType,
  getAmountOfMealsByTimePeriod,
  getMostCommonPainLevelFood,
  updateProfilePicture
};

export default exportObj;
