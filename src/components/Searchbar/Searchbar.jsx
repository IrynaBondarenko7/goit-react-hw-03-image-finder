import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export class Searchbar extends Component {
  state = {
    imgName: '',
  };
  handleSearchImgNameChange = event => {
    this.setState({ imgName: event.currentTarget.value.toLowerCase() });
  };
  handleSubmit = event => {
    event.preventDefault();
    if (this.state.imgName.trim() === '') {
      toast.error('Enter the name for the search');
      return;
    }
    this.props.onSubmit(this.state.imgName);
    this.setState({ imgName: '' });
    this.props.resetPage();
  };
  render() {
    return (
      <header className="searchbar">
        <Toaster />
        <form onSubmit={this.handleSubmit} className="form">
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            value={this.state.imgName}
            onChange={this.handleSearchImgNameChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
