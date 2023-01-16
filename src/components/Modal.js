import { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

export class Modal extends Component {
  static propTypes = {
    tag: PropTypes.string.isRequired,
    largeImageUrl: PropTypes.string.isRequired,
    toggleModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyClose);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyClose);
  }

  onKeyClose = e => {
    if (e.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  onOverlayClick = e => {
    if (e.target === e.currentTarget) {
      return this.props.toggleModal();
    }
  };

  render() {
    const { largeImageURL, tag } = this.props;
    return (
      <Overlay onClick={this.onOverlayClick} id="overlay">
        <ModalBox>
          <img src={largeImageURL} alt={tag} />
        </ModalBox>
      </Overlay>
    );
  }
}

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
