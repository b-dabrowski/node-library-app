function BookConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.book', {
            url: '/book/:id',
            controller: 'BookCtrl',
            controllerAs: '$ctrl',
            templateUrl: 'book/book.html',            
            title: 'Book',
            resolve: {
                book: function (Book, $state, $stateParams) {
                    return Book.get($stateParams.id).then(
                        (data) => data.book,
                        (err) => $state.go('app.home')
                    );
                }
            }
        });

};

export default BookConfig;