function EditorConfig($stateProvider) {
    'ngInject';
  
    $stateProvider
    .state('app.editor', {
      url: '/editor/:id',
      controller: 'EditorCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'editor/editor.html',
      title: 'Editor',
      resolve:{
        auth: function(User) {
          return User.ensureAuthIs(true);
        },
        categories: function(Category, $state) {
          return Category.getAll().then(
            (categories) => categories,
            (err) => $state.go('app.home')
          );
        },
        authors: function(Author, $state) {
          return Author.getAll().then(
            (authors) => authors,
            (err) => $state.go('app.home')
          );
        },
        book: function(Book, User, $state, $stateParams) {          
          if ($stateParams.id) {
            return Book.get($stateParams.id, User.current).then(
              (book) => {                
                if (book.canEdit) {
                  return book;                
                } else {
                  $state.go('app.home');
                }
              },              
              (err) => $state.go('app.home')
            );          
          } else {
            return null;
          }
        }
  
      }
    });
  
  };
  
  export default EditorConfig;