class HomeCtrl {
  constructor(AppConstants, User) {
    'ngInject';
    
    this._User = User;
    this.appName = AppConstants.appName;
    this.listConfig = {
      type: 'all'
    };
  }
}

export default HomeCtrl;