import { Component } from 'react';
import SeachBar from './Searchbar';
import { Toaster } from 'react-hot-toast';
import ImageGallery from './ImageGallery';
import styled from '@emotion/styled';



export class App extends Component {
  state = {
    value: '',
  };

  handelFormSubmit = value => {
    this.setState({ value });
  };


  render() {
    return (
      <Container>
        <SeachBar onSubmit={this.handelFormSubmit} />
        <ImageGallery value={this.state.value} />

        <Toaster toastOptions={{ duration: 2000 }} />
      </Container>
    );
  }
}


////////////////style//////////////

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;