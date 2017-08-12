class LoginController {
  // static $inject = ["User"];
  constructor(User) {
    "ngInject";
    console.log(User);

  }

  $onInit(User) {
    console.log(User);

  }
}

export default LoginController;
