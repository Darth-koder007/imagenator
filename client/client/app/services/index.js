import angular from 'angular';

// Services
import UserService from './user.service';

let servicesModule = angular.module('app.services', []);
servicesModule.service('User', UserService);

export default servicesModule;
