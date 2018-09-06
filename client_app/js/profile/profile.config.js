function ProfileConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.profile', {
      abstract: true,
      url: '/@:username',
      controller: 'ProfileCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'profile/profile.html',
      resolve: {
        auth: function(User) {
          return User.ensureAuthIs(true);
        },
        profile: function (Profile, $state, $stateParams) {
          return Profile.get($stateParams.username).then(
            (profile) => profile,
            (err) => $state.go('app.home')
          );
        }
      }
    })
    .state('app.profile.main', {
      url: '',
      controller: 'ProfileBooksCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'profile/profile-books.html',
      title: 'Profile'
    })
    .state('app.profile.borrowed', {
      url: '/borrowed',
      controller: 'ProfileBooksCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'profile/profile-books.html',
      title: 'Borrowed'
    });

}

export default ProfileConfig;