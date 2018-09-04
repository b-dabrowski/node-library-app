import angular from 'angular';

let componentsModule = angular.module('app.components', []);

import ListErrors from './list-errors.component';
componentsModule.component('listErrors', ListErrors);

import ShowAuthed from './show-authed.directive';
componentsModule.directive('showAuthed', ShowAuthed);

import FollowBtn from './buttons/follow-btn.component';
componentsModule.component('followBtn', FollowBtn);

import BookPreview from './book-helpers/book-preview.component';
componentsModule.component('bookPreview', BookPreview);

import BookList from './book-helpers/book-list.component';
componentsModule.component('bookList', BookList);

import BorrowBtn from './buttons/borrow-btn.component';
componentsModule.component('borrowBtn', BorrowBtn);

export default componentsModule;