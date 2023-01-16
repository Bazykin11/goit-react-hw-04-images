import { Component } from 'react';
import toast from 'react-hot-toast';
import { ImageGalleryItem } from './ImageGalleryItem';
import { fetchImage } from './services/api';
import styled from '@emotion/styled';
import { Button } from './Button';
import { Loader } from './Loader';
import PropTypes from 'prop-types';

export default class ImageGallery extends Component {
  
  static propTypes = {
    value: PropTypes.string.isRequired,
  }
  state = {
    images: null,
    pageNumber: 1,
    loadMore: false,
    isLoading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.value;
    const nextName = this.props.value;
    if (prevName !== nextName) {
      try {
        this.setState({
          loading: true,
          images: null,
          pageNumber: 1,
          loadMore: false,
        });
        await this.fetchGallery();
      } catch (error) {
        console.log(error);
      }
    }
  }

  fetchGallery = async () => {
    try {
      const searchValue = this.props.value;
      const page = 1;

      const images = await fetchImage(page, searchValue);
      if (images.hits.length === 0) {
        return toast.error("Sorry, images not found'");
      }
      if (images.hits.length > 0 && images.totalHits <= 12) {
        this.setState({
          images: images.hits,
        });
        return toast(`Found ${images.totalHits} pictures`);
      }
      if (images.hits.length > 0 && images.totalHits > 12) {
        this.setState(prevState => ({
          images: images.hits,
          loadMore: true,
          pageNumber: prevState.pageNumber + 1,
        }));
        return;
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onLoadMore = async () => {
    try {
      const searchValue = this.props.value;
      const page = this.state.pageNumber;
      this.setState({ isLoading: true });

      const images = await fetchImage(page, searchValue);
      if (images.hits.length === 0) {
        return toast.error('Please try something else');
      }
      if (images.hits.length < 12) {
        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          loadMore: false,
          pageNumber: 1,
        }));
        toast(`Found ${images.totalHits} pictures`);
        return;
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...images.hits],
        pageNumber: prevState.pageNumber + 1,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { images, loadMore, isLoading } = this.state;
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
        {loadMore && <Button onClick= {this.onLoadMore } />}
      </>
    );
  }
}

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
