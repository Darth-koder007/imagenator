import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Editor from './editor/editor';
import Login from './login/login';

let componentModule = angular.module('app.components', [
  Home,
  About,
  Editor,
  Login
])

.name;

export default componentModule;
