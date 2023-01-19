import { useEffect } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

export const Modal = ({ largeImageURL, tag, toggleModal }) => {
  useEffect(() => {
    function onKeyClose(e) {
      if (e.code === 'Escape') {
        toggleModal();
      }
    }
    window.addEventListener('keydown', onKeyClose);
    return () => {
      window.removeEventListener('keydown', onKeyClose);
    };
  }, [toggleModal]);

  function onOverlayClick(e) {
    if (e.target === e.currentTarget) {
      return toggleModal();
    }
  }

  return (
    <Overlay onClick={onOverlayClick} id="overlay">
      <ModalBox>
        <img src={largeImageURL} alt={tag} />
      </ModalBox>
    </Overlay>
  );
};

Modal.propTypes = {
  tag: PropTypes.string.isRequired,
  largeImageUrl: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

///////style//////

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;
export const ModalBox = styled.div`
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;
