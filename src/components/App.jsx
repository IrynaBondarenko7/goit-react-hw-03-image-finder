import { Searchbar } from './Searchbar/Searchbar';
import { Component } from 'react';
import { fetchImg } from 'api';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import toast, { Toaster } from 'react-hot-toast';

const ERROR_MSG = 'Something went wrong, try again';

export class App extends Component {
  state = {
    image: '',
    page: 1,
    hits: null,
    error: null,
    total: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.image !== this.state.image) {
      try {
        this.setState({ loading: true, hits: null });
        const { hits, totalHits } = await fetchImg(
          this.state.image,
          this.state.page
        );
        console.log(totalHits);
        this.setState({ hits: hits, total: totalHits });
      } catch (error) {
        this.setState({ error: ERROR_MSG });
      } finally {
        this.setState({ loading: false });
      }
    }
    if (prevState.page !== this.state.page && this.state.page > 1) {
      try {
        this.setState({ loading: true });
        const { hits } = await fetchImg(this.state.image, this.state.page);
        this.setState({ hits: [...this.state.hits, ...hits] });
      } catch (error) {
        this.setState({ error: ERROR_MSG });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleFormSubmit = imgName => {
    this.setState({ image: imgName });
  };
  loadMoreImg = () => {
    this.setState({ page: this.state.page + 1 });
    console.log(this.state.total);
    console.log(this.state.hits.length);
    if (
      this.state.hits !== null &&
      this.state.hits.length === this.state.total
    ) {
      toast("We're sorry, but you've reached the end of search results.");
      console.log('the end');
    }
  };
  getHits = hits => {
    this.setState({ hits: hits });
  };
  resetPage = () => {
    this.setState({ page: 1 });
  };

  render() {
    return (
      <div>
        <Searchbar
          onSubmit={this.handleFormSubmit}
          resetPage={this.resetPage}
        />
        {this.state.error && <div>{this.state.error}</div>}
        {this.state.hits !== null && <ImageGallery hits={this.state.hits} />}

        {this.state.hits !== null &&
          this.state.hits.length <= this.state.total && (
            <Button loadImg={this.loadMoreImg} />
          )}
        <Toaster />
        {this.state.loading && <Loader />}
      </div>
    );
  }
}
