import { useState } from 'react';
import Modal from 'components/Modal';
import PropTypes from 'prop-types';
import {
  ImageGalleryItemWrp,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ image }) => {
  const [showModal, setShowModal] = useState(false);
  const { tags, webformatURL, largeImageURL } = image;

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <ImageGalleryItemWrp>
        <ImageGalleryItemImage
          src={webformatURL}
          alt={tags}
          onClick={toggleModal}
        />
      </ImageGalleryItemWrp>
      {showModal && (
        <Modal largeImageURL={largeImageURL} onClick={toggleModal} />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageGalleryItem;
