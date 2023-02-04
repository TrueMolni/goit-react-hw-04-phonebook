import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import ContactsList from './ContactsList/ContactsList';
import Phonebook from './Phonebook/Phonebook';
import Filter from './Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem('my-contacts'));
    return contacts ? contacts : [];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('my-contacts', JSON.stringify(contacts));
  }, [contacts]);

  const isDublicate = (name, number) => {
    const dublicateName = name.toLowerCase();
    const dublicateNumber = number;
    const result = contacts.find(({ name, number }) => {
      return name.toLowerCase() === dublicateName && number === dublicateNumber;
    });

    return Boolean(result);
  };

  const addContact = ({ name, number }) => {
    if (isDublicate(name, number)) {
      alert(`${name} with number: ${number} is already exist`);
      return false;
    }

    setContacts(prevState => {
      const newContact = { id: nanoid(), name, number };
      return [newContact, ...prevState];
    });
    return true;
  };

  const removeContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const handleFilter = ({ target }) => {
    setFilter(target.value);
  };

  const getFilteredContacts = () => {
    if (!filter) return contacts;
    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name, number }) => {
      return (
        name.toLowerCase().includes(normalizedFilter) ||
        number.includes(normalizedFilter)
      );
    });
    return result;
  };

  const filteredContacts = getFilteredContacts();
  const isContacts = Boolean(filteredContacts.length);

  return (
    <div>
      <h1>Phonebook</h1>
      <Phonebook onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter handleChange={handleFilter} />

      {isContacts && (
        <ContactsList
          contacts={filteredContacts}
          removeContact={removeContact}
        />
      )}
      {!isContacts && <p>No contacts in phonebook</p>}
    </div>
  );
};

export default App;
