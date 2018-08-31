import angular from 'angular';

let profileModule = angular.module('app.profile', []);

import ProfileConfig from './profile.config';
profileModule.config(ProfileConfig);

import ProfileCtrl from './profile.controller';
profileModule.controller('ProfileCtrl', ProfileCtrl);

import ProfileBooksCtrl from './profile-books.controller';
profileModule.controller('ProfileBooksCtrl', ProfileBooksCtrl);

export default profileModule;