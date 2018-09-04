import angular from 'angular';

let categoryModule = angular.module('app.category', []);

import CategoryConfig from './category.config';
categoryModule.config(CategoryConfig);

import CategoryCtrl from './category.controller';
categoryModule.controller('CategoryCtrl', CategoryCtrl);


export default categoryModule;
