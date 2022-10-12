import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ImageGallery extends Component {
  render() {
    const { images, onClick } = this.props;
    return (
      <ul className="ImageGallery">
        {images.map(image => {
          return (
            <ImageGalleryItem
              key={image.webformatURL}
              webformatURL={image.webformatURL}
              largeImageURL={image.largeImageURL}
              onClick={onClick}
            />
          );
        })}
      </ul>
    );
  }
}
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape),
  onClick: PropTypes.func,
};

export default ImageGallery;
