import { useState } from 'react';
import style from './SearchBar.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

function SearchBar({ onSubmit, setPage }) {
  const [require, setRequire] = useState('');

  const handleChange = event => {
    const value = event.currentTarget.value;

    setRequire(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (require.trim() === '') {
      toast.error('Нужно что-то ввести', { autoClose: 3000 });
      return;
    }


    setPage(1);
    onSubmit(require);
    setRequire('');
  };

  return (
    <header className={style.searchbar}>
      <form className={style.form} onSubmit={handleSubmit}>
        <input name='require'
               value={require}
               type='text'
               placeholder='Search images and photos'
               className={style.input}
               onChange={handleChange}
        />
        <button type='submit' className={style.button}>
          <AiOutlineSearch />
        </button>
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default SearchBar;

