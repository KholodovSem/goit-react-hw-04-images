import {Component} from 'react';
import style from './SearchBar.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { toast } from 'react-toastify';

class SearchBar extends Component {
  state = {
    require : '',
  }

  handleChange = event => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    this.setState({[name]: value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {require} = this.state;

    if(require.trim() === ''){
      toast.error("Нужно что-то ввести", {autoClose: 3000})
      return
    }

    this.props.onSubmit(this.state.require);
    this.setState({ require: '' });
  }

  render() {
    const {require} = this.state;

    return (
      <header className={style.searchbar}>
        <form className={style.form} onSubmit={this.handleSubmit}>
          <input name='require'
                 value={require}
                 type='text'
                 placeholder='Search images and photos'
                 className={style.input}
                 onChange={this.handleChange}
          />
          <button type='submit' className={style.button}>
            <AiOutlineSearch />
          </button>
        </form>
      </header>
    );
  }
}

export default SearchBar;
