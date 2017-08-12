import angular from 'angular';
import uiRouter from 'angular-ui-router';
import {fabric} from 'fabric';

import editorComponent from './editor.component';

let editorModule = angular.module('editor', [
  uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('editor', {
      url: '/',
      component: 'editor'
    });
})

.component('editor', editorComponent)

.name;

export default editorModule;
