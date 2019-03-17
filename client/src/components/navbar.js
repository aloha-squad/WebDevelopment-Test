import React, { Component } from 'react';
import { Navbar, Button, Form, FormControl } from 'react-bootstrap';
import TwitterLogin from 'react-twitter-auth';

class NavBar extends Component {
    render() {
        let content = !!this.props.isAuthenticated ?
            (
                <Navbar className="justify-content-between" bg="dark" variant="dark">
                    <button onClick={this.props.logout} className="button" >Log out</button>
                    <Form inline onSubmit={this.props.searchHashtag}>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" name="query" />
                        <Button type="submit" variant="outline-light">Search</Button>
                    </Form>
                </Navbar>

            ) :
            (
                <Navbar bg="dark" variant="dark">
                    <TwitterLogin loginUrl="http://localhost:5000/api/v1/auth/twitter"
                        onFailure={this.props.onFailed} onSuccess={this.props.onSuccess}
                        requestTokenUrl="http://localhost:5000/api/v1/auth/twitter/reverse"
                    />
                </Navbar>
            );
        return (
            <div>
                {content}
            </div>
        );
    }
}

export default NavBar;