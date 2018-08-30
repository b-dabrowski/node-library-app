import angular from 'angular';
import constants  from './config/app.constants';
import appConfig  from './config/app.config';
import appRun     from './config/app.run';
import 'angular-ui-router';
import './config/app.templates';
import './layout';
import './components';
import './home';
import './auth';
import './services';
import './settings';
import './profile';
import './author';
import './editor';
import './book';

const requires = [
  'ui.router',
  'templates',
  'app.layout',
  'app.components',
  'app.home',
  'app.auth',
  'app.services',
  'app.settings',
  'app.profile',
  'app.author',
  'app.editor',
  'app.book'
];

window.app = angular.module('app', requires);

angular.module('app').constant('AppConstants', constants);

angular.module('app').config(appConfig);

angular.module('app').run(appRun);

angular.bootstrap(document, ['app'], {
  strictDi: true
});
