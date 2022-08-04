import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Component } from 'react';
import SearchBar from './SearchBar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    require: '',
  };

  onSubmit = (require) => {
    this.setState({require});
  }

  render() {
    const { require } = this.state;

    return (
      <main>
        <SearchBar onSubmit={this.onSubmit}/>
        <ImageGallery require={require} />
        <ToastContainer />
      </main>
    );
  }
};

