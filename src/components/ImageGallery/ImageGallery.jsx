import ContentLoader from 'react-content-loader';
import { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import Btn from '../Button/Button';
import style from './ImageGallery.module.css';
import findImage from '../../services/findImage';
import Modal from '../modal/Modal';

class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    error: null,
    status: 'idle',
    modal: {
      showModal: false,
      largeImage: '',
      alt: '',
    },
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    const { require } = this.props;
    const { page } = this.state;

    if (prevProps.require !== require) {
      this.setState({ status: 'pending', images: [] });

      const response = await findImage(require, page)
        .catch((error) => this.setState({ error }))
        .finally(() => this.setState({ status: 'resolved' }));

      return this.setState({
        images: response.data.hits,
        page: 1,
      });
    }

    if (prevState.page !== page) {
      const response = await findImage(require, page)
        .catch((error) => this.setState({ error }))
        .finally(() => this.setState({ status: 'resolved' }));

      this.setState({
        images: [...prevState.images, ...response.data.hits],
      });
    }
  }

  loadMore = () => {
    this.setState((prevState) => ({ page: prevState.page += 1 }));
  };

  onClickToImage = (e) => {
    e.preventDefault();
    const largeImage = e.currentTarget.href;
    const alt = e.currentTarget.getAttribute('alt');

    this.setState({
      modal: {
        largeImage,
        alt,
        showModal: true,
      },
    });

  };

  disableModal = () => {
    this.setState((prevState) => ({
        modal: {
          showModal: false,
        },
      }),
    );
  };

  render() {
    const { images, status } = this.state;
    const { showModal, alt, largeImage } = this.state.modal;

    if (status === 'idle') {
      return (<h1 className={style.title}>Что будем искать?</h1>);
    }

    if (status === 'pending') {
      return (<ContentLoader />);
    }

    if (status === 'resolved') {
      console.log(this.state.modal.largeImage);
      return (
        <section>
          <ul className={style.gallery}>
            {images.map((image) => <ImageGalleryItem src={image.webformatURL} largeImg={image.largeImageURL}
                                                     alt={image.tags} key={image.id} onClick={this.onClickToImage} />)}
          </ul>
          {images.length > 0 && <Btn images={images} onLoadMore={this.loadMore} />}
          {showModal ? <Modal alt={alt} src={largeImage} onToggleModal={this.disableModal} /> : null}
        </section>
      );
    }
  }
}


export default ImageGallery;

