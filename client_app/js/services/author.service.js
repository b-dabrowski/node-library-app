export default class Author {
  constructor(AppConstants, $http) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
  }

  get(id) {
    return this._$http({
      url: `${this._AppConstants.api}/authors/${id}`,
      method: 'GET'
    }).then((res) => res.data.author);
  }

  getAll() {
    return this._$http({
      url: `${this._AppConstants.api}/authors`,
      method: 'GET'
    }).then((res) => res.data.authors);
  }

  follow(id) {
    return this._$http({
      url: this._AppConstants.api + '/authors/' + id + '/follow',
      method: 'POST'
    }).then((res) => res.data);
  }


  unfollow(id) {
    return this._$http({
      url: this._AppConstants.api + '/authors/' + id + '/follow',
      method: 'DELETE'
    }).then((res) => res.data);
  }

  getAuthorFollowingInfo(id) {
    return this._$http({
      url: this._AppConstants.api + '/authors/' + id + '/isFollowing',
      method: 'GET'
    }).then((res) => res.data);
  }

}