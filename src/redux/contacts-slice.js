import { createSlice } from "@reduxjs/toolkit";

import { getContacts, addContact, deleteContact } from './conacts-operations';

const initialState = {
    items: [],
    loading: false,
    error: null
}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: {
    [getContacts.pending]: (store, _) => ({
      ...store,
      loading: true,
      error: null,
    }),
    [getContacts.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.items = payload;
    },
    [getContacts.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },

    [addContact.pending]: (store, _) => ({
      ...store,
      loading: true,
      error: null,
    }),
    [addContact.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.items.push(payload);
    },
    [addContact.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },

    [deleteContact.pending]: (store, _) => ({
      ...store,
      loading: true,
      error: null,
    }),
    [deleteContact.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.items = store.items.filter(item => item.id !== payload);
    },
    [deleteContact.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
  },
});

export default contactsSlice.reducer;