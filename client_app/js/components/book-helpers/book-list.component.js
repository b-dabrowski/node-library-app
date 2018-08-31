class BookListCtrl {
    constructor(Book) {
      'ngInject';
  
      this._Book = Book;
  
      this.setListTo(this.listConfig);
  
    }
  
    setListTo(newList) {
      this.list = [];      
      this.listConfig = newList;
  
      this.runQuery();
    }
  
    runQuery() {      
      this.loading = true;
        
      let queryConfig = {
        type: this.listConfig.type,
        filters: this.listConfig.filters || {}
      };
        
      queryConfig.filters.limit = this.limit;
        
      this._Book
        .query(queryConfig)
        .then(
          (res) => {
            this.loading = false;
              
            this.list = res.books;
          }
        );
    }
  
  }
  
  let BookList = {
    bindings: {
      limit: '=',
      listConfig: '='
    },
    controller: BookListCtrl,
    templateUrl: 'components/book-helpers/book-list.html'
  };
  
  export default BookList;