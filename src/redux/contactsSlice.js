import initialContacts from '../components/phone-book.json';
const { createSlice, nanoid } = require('@reduxjs/toolkit');

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContacts,
  reducers: {
    addNewContact(state, { payload }) {
      state.push({ ...payload, id: nanoid() });
    },
    deleteContact(state, { payload }) {
      return state.filter(item => item.id !== payload);
    },
  },
});

export const { addNewContact, deleteContact } = contactsSlice.actions;
