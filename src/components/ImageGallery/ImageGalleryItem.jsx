import PropTypes from 'prop-types';
import style from './ImageGalleryItem.module.css';
import { useModalContext } from '../ModalContext/ModalContext';


function ImageGalleryItem({ src, alt }) {
  const { onClickAtImage } = useModalContext();

  return (
    <li className={style.galleryItem} onClick={(e) => {
      e.preventDefault();

      onClickAtImage(src, alt);
    }}>
      <img src={src} alt={alt} className={style.image} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  alt: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
};

export default ImageGalleryItem;

