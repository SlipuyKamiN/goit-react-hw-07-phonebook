import {
  PhonebookWrapper,
  PhonebookTitle,
  PhonebookSubTitle,
} from './App.styled';
import { ContactForm } from 'components/Form/Form';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/operations';
import { getStatus } from 'redux/selectors';
import { STATUS } from 'redux/constants';
const { IDLE, PENDING, REJECTED } = STATUS;

export const App = () => {
  const dispatch = useDispatch();
  const status = useSelector(getStatus);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <PhonebookWrapper>
      <PhonebookTitle>Phonebook</PhonebookTitle>
      <ContactForm />
      <PhonebookSubTitle>Contacts</PhonebookSubTitle>
      {status === IDLE && (
        <span>There are no contacts in your phonebook, yet.</span>
      )}
      {status !== IDLE && <Filter />}
      {status === PENDING && <span>Updating, please wait...</span>}
      {status !== REJECTED && status !== IDLE && <ContactList />}
      {status === REJECTED && (
        <span>Oops, something went wrong. Please try again!</span>
      )}
    </PhonebookWrapper>
  );
};
