import axios from 'axios';
import url from './url';

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

const exportObj = {
  login,
  register
};

export default exportObj;
