import React, { Component } from 'react';

import NavBar from './components/navbar';
import Map from './components/map';

import SearchService from './services/searchService';

class App extends Component {
  state = {
    isAuthenticated: false,
    user: null,
    token: '',
    tweets: []
  };

  //Authentication successfull
  onSuccess = (response) => {
    const token = response.headers.get('x-auth-token');
    response.json().then(user => {
      if (token) {
        this.setState({ isAuthenticated: true, user: user, token: token });
      }
    });
  };

  //Authentication failed
  onFailed = (error) => {
    alert(error);
  };

  //Logout cleans user authenticated data from state
  logout = () => {
    this.setState({ isAuthenticated: false, token: '', user: null })
  };

  searchHashtag = async (e) => {
    if (e !== undefined)
      e.preventDefault();

    const query = e.currentTarget.elements.query.value;


    const response = await SearchService.post('/hashtag', {
      q: query,
      count: 100
    });

    let tweets = await response.data;

    this.setState({ tweets: tweets });
  };

  render() {
    return (
      <div className="App">
        <NavBar
          isAuthenticated={this.state.isAuthenticated}
          searchHashtag={this.searchHashtag}
          onSuccess={this.onSuccess}
          onFailed={this.onFailed}
          logout={this.logout}
        />
        <Map tweets={this.state.tweets} />
      </div>
    );
  }
}

export default App;