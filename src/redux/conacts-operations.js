import * as API from './contacts-fetch';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getContacts = createAsyncThunk(
  'contacts/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const data = await API.getContacts();
       console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, { rejectWithValue }) => {
    const data = await API.addContact(contact);
    try {
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (contact, { getState }) => {
      const { contacts } = getState();
      const dublicate = contacts.items.find(item => item.name === contact.name);
      if (dublicate) {
        alert(`${contact.name} is already in contacts list`);
        return false;
      }
      return contact;
    },
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    const data = await API.deleteContact(id);
    try {
      return data.id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
