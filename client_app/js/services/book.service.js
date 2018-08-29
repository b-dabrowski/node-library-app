export default class Book {
    constructor(AppConstants, $http) {
      'ngInject';
  
      this._AppConstants = AppConstants;
      this._$http = $http;
    }
  
    save(book) {
      let request = {};

      if(book._id){
        request.url = `${this._AppConstants.api}/books/${book._id}`;
        request.method = 'PUT';
      } else {
        request.url = `${this._AppConstants.api}/books`;
        request.method = 'POST';
      }

      request.data = { book: book }

      return this._$http(request).then((res) => res.data.book);
    }

    get(id) {
      return this._$http({
        url: `${this._AppConstants.api}/books/${id}`,
        method: 'GET'
      }).then((res) => res.data);
    }
  }