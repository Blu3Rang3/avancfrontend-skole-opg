import React from 'react';
import PropTypes from 'prop-types';

function ImageLink({ href, imgSrc, alt }) {
  return (
    <a href={href} className='px-10'>
      <img src={imgSrc} alt={alt} style={{ width: '100%', height: 'auto' }} />
    </a>
  );
}

ImageLink.propTypes = {
  href: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImageLink;
