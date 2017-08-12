import template from './login.html';
import controller from './login.controller';
import './login.scss';

let loginComponent = {
  bindings: {
    onLogin: '&',
  },
  template,
  controller
};

export default loginComponent;
