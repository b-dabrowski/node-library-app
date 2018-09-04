function AuthorConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.author', {
      url: '/author/@:id',
      controller: 'AuthorCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'author/author.html',
      resolve: {
        author: function (Author, User, $state, $stateParams) {
          if (User.current) {
            return Author.getAuthorFollowingInfo($stateParams.id).then(
              (author) => author,
              (err) => $state.go('app.home')
            );
          } else {
            return Author.get($stateParams.id).then(
              (author) => author,
              (err) => $state.go('app.home')
            );
          }
        }
      }
    });

};

export default AuthorConfig;