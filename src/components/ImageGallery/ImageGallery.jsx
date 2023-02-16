import ImageGalleryItem from 'components/ImageGalleryItem';
import { ImageGallerys } from './ImageGallery.styled';
import PropTypes from 'prop-types';

const ImageGallery = ({ images }) => {
  return (
    <ImageGallerys>
      {images.map(image => (
        <ImageGalleryItem key={image.id} image={image} />
      ))}
    </ImageGallerys>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired
  ),
};

export default ImageGallery;
