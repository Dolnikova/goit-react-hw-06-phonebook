import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, getContacts } from 'redux/contactsSlice';
import { ButtonDelete, List } from './ContactListStyled';
// import { List } from './ContactListStyled';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const deleteSelectedContact = contactID => dispatch(deleteContact(contactID));
  return (
    <ul>
      {contacts.map(contact => (
        <List key={contact.id}>
          {contact.name}: {contact.number}
          <ButtonDelete
            type="button"
            onClick={() => deleteSelectedContact(contact.id)}
          >
            Delete
          </ButtonDelete>
        </List>
      ))}
    </ul>
  );
};
