import axios from 'axios';
import { ENDPOINT } from '../../utils/urls';

function setAuthToken(token) {
  localStorage.setItem('authToken', token);
}

export function getAuthToken() {
  return localStorage.getItem('authToken');
}

export function removeAuthToken() {
  localStorage.removeItem('authToken', getAuthToken());
}

export async function verifyUser(email, password) {
  try {
    const response = await axios.post(ENDPOINT.login, {
      email,
      password,
    });

    const token = response.data.data.token;
    setAuthToken(token);
    return { message: 'OK', data: response?.data };
  } catch (error) {
    return { message: 'Error occurred', data: error.response?.data };
  }
}

export function setAuthHeader() {
  const token = getAuthToken();
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}