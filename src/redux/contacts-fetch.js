import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://62e3e8bf3c89b95396d39341.mockapi.io/contacts',
});

export const getContacts = async () => {
  const { data } = await instance.get('/');

  return data;
};

export const addContact = async contact => {
  const { data } = await instance.post('/', contact);

  return data;
};

export const deleteContact = async id => {
  const { data } = await instance.delete(`/${id}`);

  return data;
};
