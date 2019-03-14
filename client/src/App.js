import React, { Component } from 'react';

import NavBar from './components/navbar';

class App extends Component {

  state = {
    isAuthenticated: false,
    user: null,
    token: ''
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

  render() {
    return (
      <div className="App">
        <NavBar
          state={this.state} 
          onSuccess={this.onSuccess}
          onFailed={this.onFailed} 
          logout={this.logout}       
        />
      </div>
    );
  }
}

export default App;