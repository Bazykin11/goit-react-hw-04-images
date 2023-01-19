
import toast from 'react-hot-toast';
import { ImageGalleryItem } from './ImageGalleryItem';
import { fetchImage } from './services/api';
import styled from '@emotion/styled';
import { Button } from './Button';
import { Loader } from './Loader';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

export const ImageGallery = ({ value }) => {
  const [images, setImages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const images = await fetchImage(1, value);
        if (images.hits.length === 0) {
          return toast.error("Sorry, images not found'");
        }
        if (images.hits.length > 0 && images.totalHits <= 12) {
          setImages(images.hits);
          return toast(`Found ${images.totalHits} pictures`);
        }
        if (images.hits.length > 0 && images.totalHits > 12) {
          setImages(images.hits);
          setPageNumber(prevState => prevState + 1);
          setLoadMore(true);
          return;
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (value === '') {
      return;
    }
    setIsLoading(true);
    setImages(null);
    setLoadMore(false);
    setPageNumber(1);
    fetchGallery();
  }, [value]);

  const onLoadMore = async () => {
    try {
      setIsLoading(true);

      const images = await fetchImage(pageNumber, value);
      if (images.hits.length === 0) {
        return toast.error('Please try something else');
      }

      if (images.hits.length < 12) {
        setImages(prevState => [...prevState, ...images.hits]);
        setLoadMore(false);
        setPageNumber(1);
        toast(`Found ${images.totalHits} pictures`);
        return;
      }
      setImages(prevState => [...prevState, ...images.hits]);
      setPageNumber(prevState => prevState + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Gallery className="gallery">
        {images &&
          images.map(image => {
            return (
              <ImageGalleryItem
                key={image.id}
                url={image.webformatURL}
                tag={image.tags}
                largeImageUrl={image.largeImageURL}
              />
            );
          })}
      </Gallery>
      {isLoading && <Loader />}
      {loadMore && <Button onClick={onLoadMore} />}
    </>
  );
};

  ImageGallery.propTypes = {
    value: PropTypes.string.isRequired,
  };



/////////////style//////////////////

const Gallery = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;
