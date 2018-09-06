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

    validate() {
        let isDataValid = true;
        this.errors = {};

        if (!this.book.title.length) {
            this.errors.title = ['field is required'];
            isDataValid = false;
        }

        if (!this.book.category.length) {
            this.errors.category = ['field is required'];
            isDataValid = false;
        }

        if (!this.book.author.length) {
            this.errors.author = ['field is required'];
            isDataValid = false;
        }

        if (!this.book.description.length) {
            this.errors.description = ['field is required'];
            isDataValid = false;
        }

        return isDataValid;
    }

    submit() {
        this.isSubmitting = true;
        let isDataValid = this.validate();

        if (isDataValid) {        
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
        } else {
            this.isSubmitting = false;
        }
    }
}

export default EditorCtrl;