import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContactForm } from './Phonebook/ContactForm/ContactForm';
import { ContactList } from './Phonebook/ContactList/ContactList';
import { Container } from './Phonebook/cotainer';
import Filter from './Phonebook/Filter/Filer';
import { useSelector } from 'react-redux';
import { getContacts } from 'redux/contactsSlice';

export const App = () => {
  const contacts = useSelector(getContacts);

  // const addNewContact = data => {
  //   const { name, number } = data;
  //   const contact = {
  //     id: nanoid(),
  //     name,
  //     number,
  //   };
  //   if (
  //     contacts.some(
  //       ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
  //     )
  //   ) {
  //     notify(name);
  //     return;
  //   }
  //   setContacts(prevContacts => [contact, ...prevContacts]);
  // };

  // const onFilter = filter => {
  //   setFilter(filter);
  // };
  // useEffect(() => {
  //   const parcedPhonebook = JSON.parse(localStorage.getItem('phone-book'));
  //   parcedPhonebook
  //     ? setContacts(parcedPhonebook)
  //     : setContacts(initialContacts);
  // }, []);

  // useEffect(() => {
  //   if (!contacts.length) return;
  //   localStorage.setItem('phone-book', JSON.stringify(contacts));
  // }, [contacts]);

  // const visibleContacts = contacts.filter(contact =>
  //   contact.name.toLowerCase().includes(filter.toLowerCase())
  // );
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
        <ContactForm />
        <h2>Contacts</h2>
        {contacts.length > 1 && <Filter />}
        {contacts.length > 0 ? (
          <ContactList
          // contacts={visibleContacts}
          // deleteContact={deleteContact}
          />
        ) : (
          'You have no contacts saved'
        )}
      </Container>
    </>
  );
};
