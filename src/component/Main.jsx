import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import '../App.css';
import { mainState } from '../mobx/mainState';
import Login from './auth/login';

const Main = observer((props) => {
  useEffect(() => {
    if (mainState.token) {
      go();
    } else goLogin();
  });
  const go = () => props.transition.router.stateService.go('notes');
  const goLogin = () => props.transition.router.stateService.go('login');
  return <div> v1.0.0</div>;
});

export default Main;
