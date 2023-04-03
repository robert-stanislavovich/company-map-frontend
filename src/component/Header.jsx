import { observer } from 'mobx-react-lite';
import React from 'react';
import { Container, Nav, Navbar, NavbarBrand } from 'react-bootstrap';
import '../App.css';
import { mainState } from '../mobx/mainState';

const Header = observer((props) => {
  return (
    <div>
      <Navbar>
        <Container style={{ color: '#525252' }}>TeamMap</Container>
        <NavbarBrand>
          {mainState.user ? mainState.user.name : ''}
          {mainState.authUserName && !mainState.user
            ? mainState.authUserName
            : ''}
        </NavbarBrand>
        {mainState.token ? (
          <Nav.Link
            style={{ color: 'brown' }}
            onClick={() => mainState.logOut()}
          >
            Выйти
          </Nav.Link>
        ) : (
          ''
        )}
      </Navbar>
    </div>
  );
});

export default Header;
