import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from './Modal';


export const ImageGalleryItem = ({ largeImageUrl, tag, url }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <>
      <Li>
        <Img src={url} alt={tag} onClick={toggle} />
        {isOpen && (
          <Modal largeImageURL={largeImageUrl} tag={tag} toggleModal={toggle} />
        )}
      </Li>
    </>
  );
};


ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  largeImageUrl: PropTypes.string.isRequired,
};

//////////////////style////////////

const Li = styled.li`
  border-radius: 2px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`;

const Img = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    transform: scale(1.03);
    cursor: zoom-in;
  }
`;





