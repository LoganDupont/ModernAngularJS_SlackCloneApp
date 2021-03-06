import '../sass/styles.scss';
import angular from 'angular';
import ngRedux from 'ng-redux';
import ngReduxUiRouter from 'redux-ui-router';
import createLogger from 'redux-logger';
import rootReducer from './root.reducer';
import RootComponent from './root.component';
import ChatModule from './chat/chat.module';
import { default as DevTools, runDevTools } from './devTools';
import thunk from 'redux-thunk';

/**
 * @ngdoc module
 * @name root
 *
 * @description
 *
 * This is the root module
 *
 **/
const RootModule = angular
  .module('root', [
    ngRedux.default,
    ngReduxUiRouter,
    ChatModule.name
  ])
  .component('root', RootComponent);

if (process.env.NODE_ENV === 'development') {
  RootModule
    .config(/*@ngInject*/($ngReduxProvider) => {
      $ngReduxProvider.createStoreWith(
        rootReducer,
        ['ngUiRouterMiddleware', thunk, createLogger()],
        [DevTools.instrument()
      ]);
    })
    .run(runDevTools)
} else {
  RootModule
    .config(/*@ngInject*/($ngReduxProvider) => {
      $ngReduxProvider.createStoreWith(rootReducer,
        ['ngUiRouterMiddleware', thunk]);
    })
}

export default RootModule;
