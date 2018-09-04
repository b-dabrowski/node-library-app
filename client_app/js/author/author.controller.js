class AuthorCtrl {
  constructor(author, User) {
    'ngInject';

    this.author = author;
    this._User = User;
    this.listConfig = {
      type: 'author'
    };

    this.listConfig.filters = {author: this.author._id};
  }

  canDoAction() {
    if (this._User.current) {
      return true;
    } else {
      return false;
    }
  }
}

export default AuthorCtrl;