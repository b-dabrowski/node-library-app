export default class Book {
  constructor(AppConstants, $http, $q) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$q = $q;
  }

  save(book) {
    let request = {};

    if (book._id) {
      request.url = `${this._AppConstants.api}/books/${book._id}`;
      request.method = 'PUT';
    } else {
      request.url = `${this._AppConstants.api}/books`;
      request.method = 'POST';
    }

    request.data = {
      book: book
    };

    return this._$http(request).then((res) => res.data.book);
  }

  get(id, isUserLogded) {
    let deferred = this._$q.defer();

    if (!id) {
      deferred.reject("Book id is empty");
      return deferred.promise;
    }

    this._$http({
      url: `${this._AppConstants.api}/books/${id}${isUserLogded ? `` : `/notLogged`}`,
      method: 'GET'
    }).then(
      (res) => deferred.resolve(res.data.book),
      (err) => deferred.reject(err)
    );

    return deferred.promise;
  }

  destroy(id) {
    return this._$http({
      url: `${this._AppConstants.api}/books/${id}`,
      method: 'DELETE'
    });
  }

  query(config) {
    let url = this.getUrl(config.type);

    let request = {
      url: url,
      method: 'GET',
      params: config.filters ? config.filters : null
    };

    return this._$http(request).then((res) => res.data);
  }

  getUrl(type) {
    let url = '';

    switch (type) {
      case 'borrowed':
        url = `${this._AppConstants.api}/books/borrowed`;
        break;

      case 'created':
        url = `${this._AppConstants.api}/books/created`;
        break;

      case 'author':
        url = `${this._AppConstants.api}/books/author`;
        break;

      case 'category':
        url = `${this._AppConstants.api}/books/category`;
        break;

      default:
        url = `${this._AppConstants.api}/books`;
        break;
    }

    return url;
  }

  borrowBook(id){
    return this._$http({
      url: this._AppConstants.api + '/books/' + id + '/borrow',
      method: 'POST'
    }).then((res) => res.data);
  }

  returnBook(id){
    return this._$http({
      url: this._AppConstants.api + '/books/' + id + '/borrow',
      method: 'DELETE'
    }).then((res) => res.data);
  }
}