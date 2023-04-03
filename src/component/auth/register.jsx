import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Alert, Form, Row } from 'react-bootstrap';
import { mainState } from '../../mobx/mainState';
import { Button } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';

const Register = observer((props) => {
  useEffect(() => {
    if (mainState.token) go();
  }, [mainState.token]);
  useEffect(() => {
    if (mainState.error != null) {
      setTimeout(() => mainState.setError(false), 2000);
    }
  }, [mainState.error]);
  const go = () => props.transition.router.stateService.go('notes');
  const goLogin = () => props.transition.router.stateService.go('login');

  const handleSubmit = (e) => {
    mainState.sendRegisterForm();
  };

  const handleEmailChange = (e) => {
    mainState.handleEmailChange(e.target.value);
  };
  const handlePasswordChange = (e) => {
    mainState.handlePasswordChange(e.target.value);
  };
  const handleNameChange = (e) => {
    mainState.handleNameChange(e.target.value);
  };
  return (
    <Fade>
      <div className="loginPage">
        <Fade>
          {mainState.error ? (
            <Alert
              style={{ marginLeft: '40%', marginRight: '40%', marginTop: '1%' }}
              variant="danger"
            >
              {mainState.error}
            </Alert>
          ) : (
            ''
          )}
        </Fade>
        <div>
          {mainState.fetching ? (
            <div>Загрузка...</div>
          ) : (
            <Form className="loginForm">
              <Row>
                <Form.Group controlId="formRegisterEmail">
                  <Form.Control
                    style={{ backgroundColor: 'rgb(244, 240, 230)' }}
                    type="email"
                    placeholder="example@example.com"
                    onChange={handleEmailChange}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group controlId="formRegisterName">
                  <Form.Control
                    style={{
                      backgroundColor: 'rgb(244, 240, 230)',
                    }}
                    type="text"
                    placeholder="John Smith"
                    onChange={handleNameChange}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group controlId="formRegisterPassword">
                  <Form.Control
                    style={{ backgroundColor: 'rgb(244, 240, 230)' }}
                    type="password"
                    placeholder="******"
                    onChange={handlePasswordChange}
                  />
                </Form.Group>
              </Row>
              <Button
                variant="warning"
                style={{ marginTop: '10px' }}
                onClick={(e) => {
                  handleSubmit(e);
                  go();
                }}
              >
                Создать пользователя
              </Button>
              <div>
                <Button
                  variant="link"
                  size="sm"
                  style={{ marginLeft: '5px', color: 'gray' }}
                  onClick={(e) => {
                    goLogin();
                  }}
                >
                  Войти
                </Button>
              </div>
            </Form>
          )}
        </div>
      </div>
    </Fade>
  );
});

export default Register;
