import initialContacts from '../components/phone-book.json';
const { createSlice } = require('@reduxjs/toolkit');

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContacts,
  reducers: {
    addNewContact(state, { payload }) {
      state.push(payload);
    },
    deleteContact(state, { payload }) {
      return state.filter(item => item.id !== payload);
    },
  },
});

export const { addNewContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;

export const getContacts = state => state.contacts;
