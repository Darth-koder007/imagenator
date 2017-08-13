class NavbarController {
  constructor($state) {
    "ngInject";

    this._$state = $state;
    this.name = 'navbar';
  }

  gotoHome() {
    this._$state.go('home');
  }
}

export default NavbarController;
