import PropTypes from 'prop-types';
import style from './ImageGalleryItem.module.css';


function ImageGalleryItem ({src, alt, onClick, largeImg}) {
  return (
    <li className={style.galleryItem}>
      <a href={largeImg} alt={alt} onClick={onClick}>
      <img src={src} alt={alt} className={style.image}/>
      </a>
    </li>
  )
}

ImageGalleryItem.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired
}

export default ImageGalleryItem;

