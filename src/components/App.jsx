import { useState, useEffect } from 'react';
import { fetchApi } from './Api/Api';
import { AppWrp } from './App.styled';
import Button from './Button';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import SearchBar from './Searchbar';
import PropTypes from 'prop-types';

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);

  const handleFormSubmit = newSearchQuery => {
    if (newSearchQuery === '' || newSearchQuery === searchQuery) {
      return;
    }

    setSearchQuery(newSearchQuery);
    setImages([]);
    setPage(1);
    setTotal(0);
    setError(null);
  };

  const handleOnLoading = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    async function fetchImage(searchQuery, page) {
      try {
        setIsLoading(true);
        const data = await fetchApi(searchQuery, page);
        const hitsData = data.hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => {
            return { id, tags, webformatURL, largeImageURL };
          }
        );
        setImages(prevImages => {
          return page === 1 ? [...hitsData] : [...prevImages, ...hitsData];
        });
        setTotal(data.totalHits / 12);
        return data.hits;
      } catch (error) {
        setImages([]);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (!searchQuery) {
      return;
    }
    fetchImage(searchQuery, page);
  }, [page, searchQuery,error]);

  return (
    <AppWrp>
      <SearchBar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} />
      {!!images.length && page <= total && <Button onClick={handleOnLoading} />}
      {isLoading && <Loader />}
    </AppWrp>
  );
};

App.propTypesrops = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired,
    }).isRequired
  ),
  searchQuery: PropTypes.string,
  page: PropTypes.number,
};
