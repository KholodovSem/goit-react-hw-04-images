import PropTypes from 'prop-types';
import style from './ImageGalleryItem.module.css';


function ImageGalleryItem({ src, alt, onClick, largeImg }) {
  return (
    <li className={style.galleryItem} onClick={(e) => onClick(e, largeImg)}>
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

