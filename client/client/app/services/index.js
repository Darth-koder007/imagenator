import angular from 'angular';

// Services
import UserService from './user.service';

// Create the module where our functionality can attach to
// let servicesModule = angular.module('app.services', [
//   User
// ])
// .name;
let servicesModule = angular.module('app.services', []);
servicesModule.service('User', UserService);

export default servicesModule;
