class ProfileBooksCtrl {
  constructor(profile, $state, $rootScope) {
    'ngInject';

    this.profile = profile;

    this.profileState = $state.current.name.replace('app.profile.', '');

    this.listConfig = {
      type: 'all'
    };

    if (this.profileState === 'main') {
      this.listConfig.type = 'created';
      $rootScope.setPageTitle('@' + this.profile.username);

    } else if (this.profileState === 'borrowed') {
      this.listConfig.type = 'borrowed';
      $rootScope.setPageTitle(`Books borrowed by ${this.profile.username}`);
    }
  }
}


export default ProfileBooksCtrl;