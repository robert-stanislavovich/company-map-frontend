import { pushStateLocationPlugin, UIRouter } from '@uirouter/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './component/auth/login';
import Register from './component/auth/register';
import Main from './component/Main';
import Notes from './component/notes/Notes';
import UsersList from './component/usersList';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const usersListState = {
  name: 'usersList',
  url: '/usersList',
  component: UsersList,
};
const loginState = { name: 'login', url: '/login', component: Login };
const registerState = {
  name: 'register',
  url: '/register',
  component: Register,
};
const notesState = { name: 'notes', url: '/notes', component: Notes };
const authState = { name: 'auth', url: '/', component: Main };

ReactDOM.render(
  <UIRouter
    plugins={[pushStateLocationPlugin]}
    states={[usersListState, loginState, registerState, notesState, authState]}
  >
    <App />
  </UIRouter>,
  document.getElementById('root')
);

reportWebVitals();
