import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.baseURL =
  'https://641201246e3ca3175304119e.mockapi.io/api/auth/contacts/';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const contacts = await axios.get();
      return contacts.data;
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, number }, thunkAPI) => {
    try {
      const addedContact = await axios.post('', {
        name,
        number,
      });
      return addedContact.data;
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const deletedContact = await axios.delete(`${id}`);
      return deletedContact.data;
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
