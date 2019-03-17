import React from 'react';
import { Col, Image, Navbar, Container } from 'react-bootstrap';

const BottomBar = () => {
    return (
        <Navbar bg="dark" variant="dark" fixed="bottom">
            <Container>
                <Col>
                    <Image src={require('../assets/red_marker.png')} roundedCircle />
                    <Navbar.Text>
                        Anger
                    </Navbar.Text>
                </Col>
                <Col>
                    <Image src={require('../assets/green_marker.png')} roundedCircle />
                    <Navbar.Text>
                        Fear
                    </Navbar.Text>
                </Col>
                <Col>
                    <Image src={require('../assets/yellow_marker.png')} roundedCircle />
                    <Navbar.Text>
                        Joy
                    </Navbar.Text>
                </Col>
                <Col>
                    <Image src={require('../assets/blue_marker.png')} roundedCircle />
                    <Navbar.Text>
                        Sadness
                    </Navbar.Text>
                </Col>
                <Col>
                    <Image src={require('../assets/white_marker.png')} roundedCircle />
                    <Navbar.Text>
                        Analytical
                    </Navbar.Text>
                </Col>
                <Col>
                    <Image src={require('../assets/purple_marker.png')} roundedCircle />
                    <Navbar.Text>
                        Confident
                    </Navbar.Text>
                </Col>
                <Col>
                    <Image src={require('../assets/marine_marker.png')} roundedCircle />
                    <Navbar.Text>
                        Tentative
                    </Navbar.Text>
                </Col>
                <Col>
                    <Image src={require('../assets/gray_marker.png')} roundedCircle />
                    <Navbar.Text>
                        Undefined
                    </Navbar.Text>
                </Col>
            </Container>
        </Navbar>
    );
}

export default BottomBar;