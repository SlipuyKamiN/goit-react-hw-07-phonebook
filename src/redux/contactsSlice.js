import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';
import { STATUS } from 'redux/constants';
const { IDLE, PENDING, FULFILLED, REJECTED } = STATUS;

const handlePending = state => {
  state.status = PENDING;
};
const handleFulfilled = state => {
  state.error = null;
  if (state.contacts.length === 0) {
    state.status = IDLE;
    return;
  }
  state.status = FULFILLED;
};

const handleRejected = (state, action) => {
  state.error = action.payload;
  state.status = REJECTED;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { contacts: [], status: IDLE, error: '' },
  extraReducers: {
    [fetchContacts.pending](state) {
      handlePending(state);
    },
    [fetchContacts.fulfilled](state, action) {
      state.contacts = action.payload;
      handleFulfilled(state);
    },
    [fetchContacts.rejected](state, action) {
      handleRejected(state, action);
    },
    [addContact.pending](state) {
      handlePending(state);
    },
    [addContact.fulfilled](state, action) {
      state.contacts.push(action.payload);
      handleFulfilled(state);
    },
    [addContact.rejected](state, action) {
      handleRejected(state, action);
    },
    [deleteContact.pending](state) {
      handlePending(state);
    },
    [deleteContact.fulfilled](state, action) {
      state.contacts = state.contacts.filter(
        ({ id }) => id !== action.payload.id
      );
      handleFulfilled(state);
    },
    [deleteContact.rejected](state, action) {
      handleRejected(state, action);
    },
  },
});

export const contactsReducer = contactsSlice.reducer;
