class BookCtrl {
    constructor(book, User, $rootScope) {
        'ngInject';

        this.book = book;
        this._User = User;
        $rootScope.setPageTitle(this.book.title);        
    }

    canDoAction() {
        if (this._User.current) {
            return true;
        } else {
            return false;
        }
    }
}

export default BookCtrl;