import {Component} from 'react';
import {createPortal} from 'react-dom';
import style from './Modal.module.css';

const modalRoot = document.querySelector('#modalRoot');

class Modal extends Component {

  componentDidMount() {
    window.addEventListener('keydown',  this.handleKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = e => {
    if (e.code === 'Escape'){
      this.props.onToggleModal();
    }
  }

  handleBackdropClick = e => {
    if (e.currentTarget === e.target){
      this.props.onToggleModal();
    }
  }

  render() {
    const {src, alt} = this.props;

    return createPortal(
      <div className={style.overlay} onClick={this.handleBackdropClick}>
        <div className={style.modal}>
          <img src={src} alt={alt} className={style.img}/>
        </div>
      </div>, modalRoot
    )
  }
}

export default Modal;
