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
                book: function (Book, Author, $state, $stateParams) {
                    let globalBook = {};
                    return Book.get($stateParams.id)
                            .then(
                                (book) => {
                                    globalBook = book;
                                    return Author.getAuthorFollowingInfo(book.author._id);                                            
                                },
                                (err) => $state.go('app.home')
                            )
                            .then(
                                (author) => {
                                    globalBook.author = author;
                                    return globalBook;
                                },
                                (err) => $state.go('app.home')
                            );
                }
            }
        });

}

export default BookConfig;