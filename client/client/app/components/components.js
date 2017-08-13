import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Editor from './editor/editor';

let componentModule = angular.module('app.components', [
  Home,
  About,
  Editor
])

.name;

export default componentModule;
