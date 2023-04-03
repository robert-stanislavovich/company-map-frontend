import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Alert, Button, Form, Row, Spinner } from 'react-bootstrap';
import { mainState } from '../../mobx/mainState';
import Fade from 'react-reveal/Fade';

const Login = observer((props) => {
  useEffect(() => {
    if (mainState.token) go();
  }, [mainState.token]);

  useEffect(() => {
    if (mainState.error != null) {
      setTimeout(() => mainState.setError(false), 2000);
    }
  }, [mainState.error]);
  const go = () => props.transition.router.stateService.go('notes');
  const goRegister = () => props.transition.router.stateService.go('register');

  const handleSubmit = (e) => {
    mainState.sendLoginForm();
  };

  const handleEmailChange = (e) => {
    mainState.handleEmailChange(e.target.value);
  };
  const handlePasswordChange = (e) => {
    mainState.handlePasswordChange(e.target.value);
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
            <Spinner style={{ color: 'orange' }} animation="grow" />
          ) : (
            <Form className="loginForm">
              <Row>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    style={{ backgroundColor: 'rgb(244, 240, 230)' }}
                    placeholder="example@example.com"
                    onChange={handleEmailChange}
                    defaultValue={mainState.email}
                    required
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group controlId="formBasicPassword">
                  <Form.Control
                    style={{ backgroundColor: 'rgb(244, 240, 230)' }}
                    type="password"
                    placeholder="******"
                    onChange={handlePasswordChange}
                    defaultValue={mainState.password}
                    required
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
                Войти
              </Button>

              <div>
                <Button
                  variant="link"
                  size="sm"
                  style={{ marginLeft: '5px', color: 'gray' }}
                  onClick={(e) => {
                    goRegister();
                  }}
                >
                  Зарегистрироваться
                </Button>
              </div>
            </Form>
          )}
        </div>
      </div>
    </Fade>
  );
});

export default Login;
