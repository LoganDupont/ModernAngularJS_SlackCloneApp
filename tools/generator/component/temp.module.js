import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import <%= namePascal %>Component from './<%= nameKebab %>.component';

/**
 * @ngdoc module
 * @name <%= namePascal %>Module
 *
 * @description 
 *
 * This is the <%= namePascal %> module
 *
 **/
const <%= namePascal %>Module = angular
  .module('<%= moduleName %>', [
    uiRouter
  ])
  .component('<%= nameCamel %>', <%= namePascal %>Component)
  .config(/*@ngInject*/ ($stateProvider) => {
    $stateProvider
      .state('<%= nameCamel %>', {
        url: '/<%= nameCamel %>',
        component: '<%= nameCamel %>'
      })
  });

export default <%= namePascal %>Module;
