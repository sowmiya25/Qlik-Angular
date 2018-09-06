var scriptsUrl = 'http://localhost:4848/extensions/angularTemplate/';

require.config({
  baseUrl: "http://localhost:4848/resources",
  paths: {
  	'domReady': scriptsUrl +'js/vendor/domReady',
	'bootstrap': scriptsUrl + 'js/vendor/bootstrap.min',
	'app': scriptsUrl + 'js/scripts/app',
	'ga': scriptsUrl + 'js/scripts/ga',
    'controller.analysisController': scriptsUrl + 'js/controllers/analysisController',
    'directive.getObject': scriptsUrl + 'js/directives/getObject',
	'service.api': scriptsUrl + 'js/services/api',
  }
});

define([
    'require',
    'angular',
    'app'
], function (require, angular) {
    'use strict';
	app.obj.angularApp = angular.module('myApp', [
		'ngAnimate',
		'ngRoute',
	]);
	app.obj.angularApp.config(function($routeProvider,$locationProvider) {
		$routeProvider
			.when('/', { 
				templateUrl: 'views/analysis.html',
				controller: 'controller.analysisController' 
			} )
            .when('/details', { 
                templateUrl: 'views/details.html',
            } )
			.otherwise({redirectTo: '/'})
	})

    require([
    	'domReady!', 
    	'js/qlik',
    	'angular',
        'ga',
    	'controller.analysisController',
    	'service.api',
        'directive.getObject',
    	'bootstrap',
    ], function (document, qlik) {
    	app.obj.qlik = qlik;
		qlik.setOnError( function ( error ) {
			if (!angular.isUndefined(error) && error.code == 16) {
				location.reload();
			} else {
				console.log(error);
			}
		} );

        angular.bootstrap( document, ["myApp", "qlik-angular"] );

        app.boot();
    });
});
