import { nanoid } from 'nanoid';
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContactForm } from './Phonebook/ContactForm/ContactForm';
import { ContactList } from './Phonebook/ContactList/ContactList';
import { Container } from './Phonebook/cotainer';
import Filter from './Phonebook/Filter/Filer';
import initialContacts from './phone-book.json';
import { useState, useEffect } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const notify = name => {
    toast.error(`Sorry, ${name} already exists`, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  const addNewContact = data => {
    const { name, number } = data;
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    if (
      contacts.some(
        ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      notify(name);
      return;
    }

    setContacts(prevContacts => [contact, ...prevContacts]);
  };

  const deleteContact = contactId => {
    const visibleContacts = contacts.filter(
      contact => contact.id !== contactId
    );
    setContacts(visibleContacts);
  };

  const onFilter = filter => {
    setFilter(filter);
  };
  useEffect(() => {
    const parcedPhonebook = JSON.parse(localStorage.getItem('phone-book'));
    parcedPhonebook
      ? setContacts(parcedPhonebook)
      : setContacts(initialContacts);
  }, []);

  useEffect(() => {
    if (!contacts.length) return;
    localStorage.setItem('phone-book', JSON.stringify(contacts));
  }, [contacts]);

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Container>
        <h2>Phonebook</h2>
        <ContactForm onSubmit={addNewContact} />
        <h2>Contacts</h2>
        {contacts.length > 0 && <Filter filter={filter} onFilter={onFilter} />}
        {contacts.length > 0 && (
          <ContactList
            contacts={visibleContacts}
            deleteContact={deleteContact}
          />
        )}
      </Container>
    </>
  );
};
