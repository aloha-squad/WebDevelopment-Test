import React, { Component } from 'react';

import NavBar from './components/navbar';
import Map from './components/map';
import BottomBar from './components/bottombar';

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
    this.setState({ isAuthenticated: false, token: '', user: null, tweets: [] })
  };

  searchHashtag = async (e) => {
    if (e !== undefined)
      e.preventDefault();

    //Search query
    const query = e.currentTarget.elements.query.value;

    //response contains the 100 tweets that contains the query containt
    const response = await SearchService.post('/search/hashtag', {
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
        <BottomBar />
      </div>
    );
  }
}

export default App;