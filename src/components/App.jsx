import React, { Component } from 'react';
import ButtonLoadMore from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import SearchBar from './Searchbar/Searchbar';
import fetchPhoto from './services/Request/request';

import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
    showModal: false,
    modalUrl: '',
  };

  componentDidUpdate(_, prevState) {
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
      const { currentPage, searchQuery } = this.state;
      const response = await fetchPhoto({
        page: currentPage,
        searchQuery: searchQuery,
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
    const { images, isLoading, showModal, modalUrl } = this.state;
    return (
      <div className="App">
        <SearchBar onSubmit={this.onChangeSerchQuery} />
        <div>
          <ImageGallery images={images} onClick={this.toggleModal} />
        </div>
        {images.length % 12 < 1 && images.length > 0 && (
          <ButtonLoadMore onClick={this.fetchImages} btnRef={this.btnRef} />
        )}
        <Loader loading={isLoading} />
        {showModal && <Modal url={modalUrl} toggleModal={this.toggleModal} />}
      </div>
    );
  }
}
