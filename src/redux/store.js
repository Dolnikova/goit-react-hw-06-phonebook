import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { contactsSlice } from './contactsSlice';
import storage from 'redux-persist/lib/storage';
import { filterReducer } from './filterSlice';

const persistConfig = {
  key: 'contacts',
  storage,
};

const persistedContacts = persistReducer(persistConfig, contactsSlice.reducer);

export const store = configureStore({
  reducer: {
    contacts: persistedContacts,
    filter: filterReducer,
  },
});

export const persistor = persistStore(store);
