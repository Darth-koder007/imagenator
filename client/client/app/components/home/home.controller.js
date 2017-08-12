class HomeController {
  constructor(User) {
    "ngInject";

    this._user = User;
    this.name = 'home';
    this.username = '';
  }

  submitForm() {
    this._user.createOrLoginUser(this.username);
  }

  logout() {
    this._user.logout();
  }
}

export default HomeController;
