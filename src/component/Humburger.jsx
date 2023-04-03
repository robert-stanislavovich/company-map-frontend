import React from 'react';
import { useSrefActive } from '@uirouter/react';
import { observer } from 'mobx-react-lite';
import Dropdown from 'react-bootstrap/Dropdown';
import { Nav } from 'react-bootstrap';

const Humburger = observer((props) => {
  const loginSref = useSrefActive('login', null, '');
  const registerSref = useSrefActive('register', null, '');

  return (
    <div style={{ marginLeft: '3%' }}>
      <Dropdown>
        <Dropdown.Toggle noCaret variant="secondary" id="dropdown-no-caret">
          Меню
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ backgroundColor: 'darkgray' }}>
          <Dropdown.Item style={{ backgroundColor: 'darkgray' }}>
            <Nav.Link {...loginSref}>Вход</Nav.Link>
          </Dropdown.Item>
          <Dropdown.Item style={{ backgroundColor: 'darkgray' }}>
            <Nav.Link href="/register" {...registerSref}>
              Регистрация
            </Nav.Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
});

export default Humburger;
