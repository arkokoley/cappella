var angular = require('angular');
var ngRoute = require('angular-route');
var knex = require('./db.js');
var app = angular.module('cappella', ['ngRoute']);
app.factory('dbData', function($q,$rootScope){
  return {
    getAllSongs: function(){
        var deferred = $q.defer();
        knex.getSongs()
        .then(function(res){
        $rootScope.$apply(function(){
            document.getElementById("spinner").remove();
            deferred.resolve(res);
        });
        });
        return deferred.promise;
      },
      getAllArtists: function(){
          var deferred = $q.defer();
          knex.getArtists()
          .then(function(res){
          $rootScope.$apply(function(){
              document.getElementById("spinner").remove();
              deferred.resolve(res);
          });
          });
          return deferred.promise;
        }
  }
});

app.config(function($routeProvider) {
  $routeProvider
    // route for the home page
    .when('/', {
        templateUrl : 'pages/home.html',
        controller  : 'mainController'
    })
    // route for the artists page
    .when('/artists', {
        templateUrl : 'pages/artist.html',
        controller  : 'artistController'
    })
    // route for the artists page
    .when('/songs', {
        templateUrl : 'pages/songs.html',
        controller  : 'songsController'
    })
});

app.controller('songsController',function($scope,dbData) {
  $scope.formData = {};
});

app.controller('songsController',function($scope,dbData) {
  $scope.formData = {};
  dbData.getAllSongs()
    .then(function(data){
        //data = JSON.parse(data);
        $scope.songs = data;
    });
});
app.controller('artistController',function($scope,dbData) {
  $scope.formData = {};
  dbData.getAllArtists()
    .then(function(data){
        $scope.artists = data;
    });
});
