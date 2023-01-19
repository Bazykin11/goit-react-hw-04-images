// import { Component } from 'react';
import { SeachBar } from './Searchbar';
import { Toaster } from 'react-hot-toast';
import {ImageGallery} from './ImageGallery';
import styled from '@emotion/styled';
import { useState } from 'react';

export const App = () => {
  const [value, setValue] = useState('');

  const handelFormSubmit = value => {
    setValue(value);
  };

  return (
    <Container>
      <SeachBar onSubmit={handelFormSubmit} />
      <ImageGallery value={value} />

      <Toaster toastOptions={{ duration: 2000 }} />
    </Container>
  );
};

////////////////style//////////////

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;
