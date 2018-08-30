class EditorCtrl {
    constructor(categories, authors, book, Book, $state) {
        'ngInject';

        this._Book = Book;
        this._$state = $state;

        this.categories = categories;
        this.authors = authors;
        if (!book) {
            this.book = {
                title: '',
                category: '',
                author: '',
                description: '',
                tags: []
            };
        } else {
            this.book = book
            this.book.category = book.category._id;
            this.book.author = book.author._id;
        }
    }

    addTag() {
        if (!this.book.tags.includes(this.tagField)) {
            this.book.tags.push(this.tagField);
            this.tagField = '';
        }
    }

    removeTag(tagName) {
        this.book.tags = this.book.tags.filter((tag) => tag != tagName);
    }

    submit() {
        this.isSubmitting = true;

        this._Book.save(this.book).then(
            (newBook) => {
                this._$state.go('app.book', {
                    id: newBook._id
                });
            },
            (err) => {
                this.isSubmitting = false;
                this.errors = err.data.errors;
            }
        );
    }
}


export default EditorCtrl;