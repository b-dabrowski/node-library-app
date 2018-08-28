import angular from 'angular';

let authorModule = angular.module('app.author', []);

import AuthorConfig from './author.config';
authorModule.config(AuthorConfig);

import AuthorCtrl from './author.controller';
authorModule.controller('AuthorCtrl', AuthorCtrl);


export default authorModule;
