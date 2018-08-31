class BookActionsCtrl {
    constructor(User, Book, $state) {
        'ngInject';
        this._User = User;
        this._Book = Book;
        this._$state = $state;
    }

    canModify() {
        if (this._User.current) {
            return this.book.canEdit;
        } else {
            return false;
        }
    }

    deleteBook() {
        this.isDeleting = true;
        this._Book.destroy(this.book._id).then(
            (success) => this._$state.go('app.home'),
            (err) => this._$state.go('app.home')
        );
    }
}

let BookActions = {
    bindings: {
        book: '='
    },
    controller: BookActionsCtrl,
    templateUrl: 'book/book-actions.html'
};

export default BookActions;