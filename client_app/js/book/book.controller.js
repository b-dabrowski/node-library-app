class BookCtrl {
    constructor(book, $rootScope) {
        'ngInject';

        this.book = book;
        $rootScope.setPageTitle(this.book.title);
    }
}

export default BookCtrl;