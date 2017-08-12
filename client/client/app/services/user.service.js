export default class User {
  constructor($http) {
    'ngInject';

    this._$http = $http;
    this.username = null;
    this.designs = [];
    this.isLoggedIn = false;
  }

  getDesigns() {
    this._$http({
      method: 'GET',
      url: 'http://localhost:8080/api/user-data',
      params: {username: this.username}
    })
    .then((response) => {console.log("dus", response);
      if (response && response.data.status === "DATA_FOUND") {
        this.isLoggedIn = true;
        this.designs = response.data.data;
      }
    })
    .catch((error) => {console.log("duc", error);});
  }

  createOrLoginUser(username) {
    this._$http({
      method: 'GET',
      url: 'http://localhost:8080/api/user-check',
      params: { username }
    })
    .then((response) => {
      if (response.data.success && response.data.status === "USER_EXISTS") {
        this.username = username;
        this.getDesigns();
      } else {
        this._$http({
          method: 'POST',
          url: 'http://localhost:8080/api/user-create',
          data: { username }
        })
        .then((response) => {
          if (response.data.success) {
            this.username = username;
            this.isLoggedIn = true;
            console.log("cols", response);
          }
        })
        .catch((error) => {console.log("colc", error)});
      }
    })
    .catch((response) => {console.log("cuc", response);});
  }

  saveDesign() {
    this._$http({
      method: 'POST',
      url: 'http://localhost:8080/api/save-design',
      data: {
        design: this.design
      }
    });
  }

  uploadImage(image) {
    let fd = new FormData();
    fd.append('image', image);
    return this._$http({
      method: 'POST',
      url: 'http://localhost:8080/api/image-upload',
      headers: { 'Content-Type': undefined},
      data: fd
    })
    .then((response) => {
      if (response.data && response.data.success) {
        return response.data.data.img_url;
      }
    })
    .catch((error) => {console.log("iuc", error);});;
  }

  logout() {
    this.username = null;
    this.designs = [];
    this.isLoggedIn = false;
  }
}
