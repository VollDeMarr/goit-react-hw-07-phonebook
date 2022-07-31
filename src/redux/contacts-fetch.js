import axios from 'axios';

const instsance = axios.create({
  baseURL: 'https://62e3e8bf3c89b95396d39341.mockapi.io/contacts',
});

export const getContacts = async () => {
  const { data } = await instsance.get('/');
  console.log(data);
  return data;
};

export const addContact = async data => {
  const { data: result } = await instsance.post('/', data);
  return result;
};

export const deleteContact = async id => {
  const { data } = await instsance.delete(`/${id}`);
  return data;
};
