import React from 'react';
import { Image, Navbar, Form, Dropdown, FormControl, Button, Nav } from 'react-bootstrap';

const Header = props => {
  const assets = '/client/assets/';
  const myPic = assets + 'myPic.jpg';
  return (
    <Navbar className="nav" expand="lg" margin-bottom="100px">
      <Navbar.Brand className="navbar-brand">devCache</Navbar.Brand>
      <Dropdown alignRight className='ml-auto'>
      <Form inline >
        <FormControl type="text" placeholder="Search" className="mr-2" />
        <Button variant="outline-success" className="mr-5">Search</Button>
        <Dropdown.Toggle id="header-dropdown">
          <Image src={'myPic'} className="corner-pic roundedCircle" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/snippets">My Snippets</Dropdown.Item>
          <Dropdown.Item href="#/settings">Settings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#/logout">Logout</Dropdown.Item>
        </Dropdown.Menu>
        </Form>
      </Dropdown>
    </Navbar>
  )
};

export default Header;