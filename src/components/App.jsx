import { Component } from 'react';
import { fetchApi } from './Api/Api';
import { AppWrp } from './App.styled';
import Button from './Button';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import SearchBar from './Searchbar';
import PropTypes from 'prop-types';

export class App extends Component {
  static defaultProps = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        tags: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        total: PropTypes.number.isRequired,
      }).isRequired
    ),
    searchQuery: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
  };

  state = {
    images: [],
    searchQuery: '',
    isLoading: false,
    page: 1,
    total: 0,
    error: false,
  };

  handleFormSubmit = searchQuery => {
    if (!searchQuery || searchQuery === this.state.searchQuery) {
      return;
    }
    this.setState({
      isLoading: true,
      searchQuery,
      images: [],
      page: 1,
      total: 0,
      error:false,
    });
  };

  handleOnLoading = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      isLoading: true,
    }));
  };

  fetchImage = async (searchQuery, page) => {
    try {
      const data = await fetchApi(searchQuery, page);
      const hitsData = data.hits.map(
        ({ id, tags, webformatURL, largeImageURL }) => {
          return { id, tags, webformatURL, largeImageURL };
        }
      );
      this.setState(prevState => ({
        images: page === 1 ? [...hitsData] : [...prevState.images, ...hitsData],
        total: data.totalHits / 12,
      }));
      return data.hits;
    } catch (error) {
      this.setState({ image: [], error: true });
      console.log(error);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.searchQuery !== this.state.searchQuery
    ) {
      this.fetchImage(this.state.searchQuery, this.state.page);
    }
  }

  render() {
    const { images, page, total, isLoading } = this.state;
    return (
      <AppWrp>
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} />
        {!!images.length && page <= total && (
          <Button onClick={this.handleOnLoading} />
        )}
        {isLoading && <Loader />}
      </AppWrp>
    );
  }
}
