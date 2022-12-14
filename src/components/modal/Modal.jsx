import { createPortal } from 'react-dom';
import style from './Modal.module.css';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modalRoot');

function Modal({ src, alt, onToggleModal }) {


  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onToggleModal();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onToggleModal();
    }
  };

  return createPortal(
    <div className={style.overlay} onClick={handleBackdropClick}>
      <div className={style.modal}>
        <img src={src} alt={alt} className={style.img} />
      </div>
    </div>, modalRoot,
  );
}

Modal.propTypes = {
  alt: PropTypes.string.isRequired,
  onToggleModal: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
};

export default Modal;

