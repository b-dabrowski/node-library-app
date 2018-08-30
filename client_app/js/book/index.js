import angular from 'angular';

let bookModule = angular.module('app.book', []);

import BookConfig from './book.config';
bookModule.config(BookConfig);

import BookCtrl from './book.controller';
bookModule.controller('BookCtrl', BookCtrl);


export default bookModule;