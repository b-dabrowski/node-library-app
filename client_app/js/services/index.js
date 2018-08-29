import angular from 'angular';

let servicesModule = angular.module('app.services', []);


import UserService from './user.service';
servicesModule.service('User', UserService);

import JwtService from './jwt.service';
servicesModule.service('JWT', JwtService);

import ProfileService from './profile.service';
servicesModule.service('Profile', ProfileService);

import AuthorService from './author.service';
servicesModule.service('Author', AuthorService);

import BookService from './book.service';
servicesModule.service('Book', BookService);

import CategoryService from './category.service';
servicesModule.service('Category', CategoryService);

export default servicesModule;