class InfoCtrl {
    constructor(AppConstants) {
      'ngInject';
      this.appName = AppConstants.appName;
        
      this.date = new Date();
    }
  }
  
  let Info = {
    controller: InfoCtrl,
    templateUrl: 'layout/info.html'
  };
  
  export default Info;
  