import angular from 'angular';

// Services
import User from './user.service';

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', [
  User
])
.name;

export default servicesModule;
