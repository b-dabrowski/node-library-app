import angular from 'angular';

let layoutModule = angular.module('app.layout', []);

import AppHeader from './header.component';
layoutModule.component('appHeader', AppHeader);

import AppFooter from './footer.component';
layoutModule.component('appFooter', AppFooter);

import AppInfo from './info.component';
layoutModule.component('appInfo', AppInfo);

export default layoutModule;
