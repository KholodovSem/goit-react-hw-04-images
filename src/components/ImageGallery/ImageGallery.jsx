import { useState } from 'react';
import { useUpdateEffect } from 'react-use';
import ContentLoader from 'react-content-loader';
import ImageGalleryItem from './ImageGalleryItem';
import Btn from '../Button/Button';
import style from './ImageGallery.module.css';
import findImage from '../../services/findImage';
import Modal from '../modal/Modal';
import { useModalContext } from '../ModalContext/ModalContext';
import PropTypes from 'prop-types';


function ImageGallery({ require, page, setPage }) {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const { showModal, largeImage, alt, disableModal } = useModalContext();

  useUpdateEffect(() => {
    setStatus('pending');
    setImages([]);

    findImage(require, page)
      .then((response) => {
        setImages(response.data.hits);
      })
      .catch((error) => console.log(error))
      .finally(() => setStatus('resolved'));
  }, [require]);

  useUpdateEffect(() => {
    if (page === 1) {
      return;
    }
    findImage(require, page)
      .then((response) => {
        setImages((prevState) =>
          [...prevState, ...response.data.hits]);
      })
      .catch((error) => console.log(error));
    // .finally(() => setStatus('resolved'));

  }, [page]);

  const loadMore = () => {
    setPage((prevState) => {
      return prevState + 1;
    });
  };

  if (status === 'idle') {
    return (<h1 className={style.title}>Что будем искать?</h1>);
  }

  if (status === 'pending') {
    return (<ContentLoader />);
  }

  if (status === 'resolved') {
    return (
      <section>
        <ul className={style.gallery}>
          {images.map((image) =>
            <ImageGalleryItem
              src={image.webformatURL}
              largeImg={image.largeImageURL}
              alt={image.tags}
              key={image.id}
            />)
          }
        </ul>
        {images.length > 0 && <Btn images={images} onLoadMore={loadMore} />}
        {showModal ? <Modal alt={alt} src={largeImage} onToggleModal={disableModal} /> : null}
      </section>
    );
  }
}

ImageGallery.propTypes = {
  page: PropTypes.number.isRequired,
  require: PropTypes.string.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default ImageGallery;

