import axios from 'axios';
// https://facebook-app.herokuapp.com/
export const domainName = 'https://facebook-app.herokuapp.com';

export const getDataAPI = async (url, token) => {
  const res = await axios.get(`${domainName}/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};

export const postDataAPI = async (url, post, token) => {
  const res = await axios.post(`${domainName}/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const putDataAPI = async (url, post, token) => {
  const res = await axios.put(`${domainName}/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const patchDataAPI = async (url, post, token) => {
  const res = await axios.patch(`${domainName}/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const deleteDataAPI = async (url, token) => {
  const res = await axios.delete(`${domainName}/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};
