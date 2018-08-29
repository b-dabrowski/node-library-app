export default class Category {
    constructor(AppConstants, $http) {
      'ngInject';
  
      this._AppConstants = AppConstants;
      this._$http = $http;
    }
  
    getAll() {
      let request = {
        url: `${this._AppConstants.api}/categories`,
        method: 'GET'        
      };
  
      return this._$http(request).then((res) => res.data.categories);
    }

    get(id) {
        let request = {
          url: `${this._AppConstants.api}/categories/${id}`,
          method: 'GET'          
        };
    
        return this._$http(request).then((res) => res.data.category);
      }
  }