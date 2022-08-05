import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  useState } from 'react';
import SearchBar from './SearchBar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { ModalProvider }  from './ModalContext/ModalContext';

function App () {
  const [require, setRequire] = useState('')
  const [page, setPage] = useState(1);

  const onSubmit = (require) => {
    setRequire(require);
  }

    return (
      <ModalProvider>
      <main>
        <SearchBar onSubmit={onSubmit} page={page} setPage={setPage}/>
        <ImageGallery require={require} page={page} setPage={setPage}/>
        <ToastContainer />
      </main>
      </ModalProvider>
    );
}

export default App;


