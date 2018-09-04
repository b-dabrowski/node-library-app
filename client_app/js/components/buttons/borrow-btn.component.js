class BorrowBtnCtrl {
    constructor(Book, User, $state) {
        'ngInject';

        this._Book = Book;
        this._User = User;

        this._$state = $state;
    }

    submit() {
        this.isSubmitting = true;

        if (!this._User.current) {
            this._$state.go('app.register');
            return;
        }

        if (this.book.currentUserBorrowed) {
            this._Book.returnBook(this.book._id).then(() => {
                    this.isSubmitting = false;
                    this.book.currentUserBorrowed = false;
                    this.book.available = true;
                });
        } else {
            this._Book.borrowBook(this.book._id).then(() => {
                this.isSubmitting = false;
                this.book.currentUserBorrowed = true;
                this.book.available = false;
            });
        }
    }

    disable() {
        if (this.book.currentUserBorrowed) {
            return false;
        } 
        
        if (this.book.available) {
            return false;
        }

        return true;
    }
}

let BorrowBtn = {
    bindings: {
        book: '='
    },
    controller: BorrowBtnCtrl,
    templateUrl: 'components/buttons/borrow-btn.html'
};

export default BorrowBtn;