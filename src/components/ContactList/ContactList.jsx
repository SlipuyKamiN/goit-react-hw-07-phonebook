import {
  ContactsList,
  ConctactListItem,
  DeleteButton,
} from './ContactList.styled';
import { deleteContact } from 'redux/operations';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filterValue = useSelector(getFilter);
  const dispatch = useDispatch();

  const filteredContacts = (() => {
    const normalizedFilter = filterValue.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  })();

  return (
    <>
      <ContactsList>
        {filteredContacts.map(contact => (
          <ConctactListItem key={contact.id}>
            {contact.name}: {contact.number}
            <DeleteButton
              type="button"
              onClick={() => {
                dispatch(deleteContact(contact.id));
              }}
            >
              Delete
            </DeleteButton>
          </ConctactListItem>
        ))}
      </ContactsList>
    </>
  );
};
