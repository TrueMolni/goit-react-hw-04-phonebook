import { useState } from 'react';
import PropTypes from 'prop-types';
import scss from './phonebook.module.scss';

const inititalState = { name: '', number: '' };

const Phonebook = ({ onSubmit }) => {
  const [state, setState] = useState({ ...inititalState });

  handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    setState({ ...inititalState });
  };

  const { name, number } = state;

  return (
    <div className={scss.wrapper}>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            className={scss.input}
            onChange={handleChange}
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label>
          Number
          <input
            className={scss.input}
            onChange={handleChange}
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className={scss.button} type="submit">
          Add contact
        </button>
      </form>
    </div>
  );
};

export default Phonebook;

Phonebook.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
