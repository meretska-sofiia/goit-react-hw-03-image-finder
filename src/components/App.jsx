import React, { Component } from 'react';
import ButtonLoadMore from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import SearchBar from './Searchbar/Searchbar';
import fetchPhoto from './services/Request/request';

import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      currentPage: 1,
      searchQuery: '',
      isLoading: false,
      error: null,
      showModal: false,
      modalUrl: '',
    };
    this.btnRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchQuery !== prevState.searchQuery) {
      this.fetchImages();
    }
  }

  onChangeSerchQuery = query => {
    this.setState({
      images: [],
      currentPage: 1,
      searchQuery: query,
      error: null,
    });
  };

  fetchImages = async () => {
    this.setState({ isLoading: true });
    try {
      const response = await fetchPhoto({
        page: this.state.currentPage,
        searchQuery: this.state.searchQuery,
      });

      this.setState(prevState => ({
        images: [...prevState.images, ...response],
        currentPage: prevState.currentPage + 1,
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  toggleModal = largeUrl => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      modalUrl: largeUrl,
    }));
  };

  render() {
    return (
      <div className="App">
        <SearchBar onSubmit={this.onChangeSerchQuery} />
        <div>
          <ImageGallery images={this.state.images} onClick={this.toggleModal} />
        </div>
        {this.state.images.length % 12 < 1 && this.state.images.length > 0 && (
          <ButtonLoadMore onClick={this.fetchImages} btnRef={this.btnRef} />
        )}
        <Loader loading={this.state.isLoading} />
        {this.state.showModal && (
          <Modal url={this.state.modalUrl} toggleModal={this.toggleModal} />
        )}
      </div>
    );
  }
}
