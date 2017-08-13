class HomeController {
  constructor(User, $state) {
    "ngInject";

    this._user = User;
    this._$state = $state;
    this.name = 'home';
    this.username = '';
    this.newDesignName ='';
    this._user.getDesigns();
  }

  submitForm() {
    this._user.createOrLoginUser(this.username);
  }

  logout() {
    this._user.logout();
  }

  createNewDesign() {
    this._user.createNewDesign(this.newDesignName);
  }

  selectDesign(id) {
    this._$state.go('editor', {id: id});
  }

  humanReadableDate(date) {
    let temp = new Date(date);
    return `${temp.toDateString()} ${temp.toTimeString()}`;
  }
}

export default HomeController;
