import { nanoid } from 'nanoid';
import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContactForm } from './Phonebook/ContactForm/ContactForm';
import { ContactList } from './Phonebook/ContactList/ContactList';
import { Container } from './Phonebook/cotainer';
import Filter from './Phonebook/Filter/Filer';
import initialContacts from './phone-book.json';

class App extends Component {
  state = {
    contacts: initialContacts,
    filter: '',
  };
  notify = name => {
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

  addNewContact = data => {
    const { contacts } = this.state;
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
      this.notify(name);
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  deleteContact = contactId => {
    const state = this.state;
    const visibleContacts = state.contacts.filter(
      contact => contact.id !== contactId
    );
    this.setState({ contacts: visibleContacts });
  };

  onFilter = filter => {
    this.setState({ filter });
  };

  componentDidMount() {
    if (localStorage.getItem('phone-book'))
      this.setState({
        contacts: JSON.parse(localStorage.getItem('phone-book')),
      });
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('phone-book', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts, filter } = this.state;
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
          <ContactForm onSubmit={this.addNewContact} />
          <h2>Contacts</h2>
          {contacts.length > 0 && (
            <Filter filter={filter} onFilter={this.onFilter} />
          )}
          {contacts.length > 0 && (
            <ContactList
              contacts={visibleContacts}
              deleteContact={this.deleteContact}
            />
          )}
        </Container>
      </>
    );
  }
}
export default App;
