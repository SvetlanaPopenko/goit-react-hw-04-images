import { Component } from 'react';
import Modal from 'components/Modal';
import PropTypes from 'prop-types';
import {
  ImageGalleryItemWrp,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
  static defaultProps = {
    image: PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;
    const { tags, webformatURL, largeImageURL } = this.props.image;
    return (
      <>
        <ImageGalleryItemWrp>
          <ImageGalleryItemImage
            src={webformatURL}
            alt={tags}
            onClick={this.toggleModal}
          />
        </ImageGalleryItemWrp>
        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.toggleModal} />
        )}
      </>
    );
  }
}

export default ImageGalleryItem;
