// app.ts
import { module, element, bootstrap, ILogService } from 'angular';
import '@uirouter/angularjs';

import { AppComponent } from './app.component';

import './app.scss';

export let app = module('app', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
    $stateProvider.state({
      name: 'app',
      url: '/app',
      component: AppComponent.NAME
    });

    $urlRouterProvider.otherwise('/');
  }])
  .component(AppComponent.NAME, new AppComponent());

element(document).ready(() => {
  bootstrap(document, ['app']);
});
