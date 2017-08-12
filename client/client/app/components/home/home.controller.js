class HomeController {
  constructor(User) {
    "ngInject";

    this.user = User;
    this.name = 'home';
    this.username = '';
  }

  submitForm() {
    console.log(this.username);
    this.user.createOrLoginUser(this.username);
  }

  logout() {
    this.user.logout();
  }
}

export default HomeController;
