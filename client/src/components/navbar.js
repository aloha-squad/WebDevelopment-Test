import React, { Component } from 'react';
import TwitterLogin from 'react-twitter-auth';

class NavBar extends Component {
    render() {
        let content = !!this.props.isAuthenticated ?
            (
                <nav className="navbar navbar-light bg-dark">
                    <button onClick={this.props.logout} className="button" >
                        Log out
                    </button>
                    <form className="form-inline" onSubmit={this.props.searchHashtag}>
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" name="query" />
                        <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </nav>
            ) :
            (
                <nav className="navbar navbar-light bg-dark">
                    <TwitterLogin loginUrl="http://localhost:5000/api/v1/auth/twitter"
                        onFailure={this.props.onFailed} onSuccess={this.props.onSuccess}
                        requestTokenUrl="http://localhost:5000/api/v1/auth/twitter/reverse"
                    />
                </nav>
            );
        return (
            <div>
                {content}
            </div>
        );
    }
}

export default NavBar;