import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';
import Contacts from '../Contacts/Contacts';
import Form from '../Form/Form';
import Filter from '../Filter/Filter';
import {
  addContact,
  deleteContact,
  getContacts,
} from '../../redux/contacts-operations';
import s from './Phoneboock.module.css';
function Phoneboock() {
    const [filter, setFilter] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

   const changeFilter = useCallback(
     ({ target }) => setFilter(target.value),
     [setFilter]
   );

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }
    const filterText = filter.toLowerCase();
    const filteredContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(filterText)
    );
    return filteredContacts;
  };
  const filteredContacts = getFilteredContacts();

  const formSubmit = data => {
    const findeName = contacts.find(item => item.name === data.name);
    if (findeName) {
      alert(`${data.name} is already in contacts list`);
      return;
    }
    const action = addContact(data);
    dispatch(action);
  };

  const removeContact = id => {
    const action = deleteContact(id);
    dispatch(action);
  };

  return (
    <div className={s.container}>
      <h1>Phoneboock</h1>
      <div className={s.inputContainer}>
        <Form onSubmit={formSubmit} />
      </div>
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <div className={s.contactsWrapper}>
        <Contacts contacts={filteredContacts} removeFn={removeContact} />
      </div>
    </div>
  );
}

export default Phoneboock;
