var angular = require('../node_modules/angular');
var DataStore = require('nedb'),
  db = new DataStore({filename: "./../cappella.db",autoload:true});
var promise = require('promise');

var app = angular.module('cappella', []);
app.factory('dbData', function($q){
  return {
    getAllSongs: function(){
        var deferred = $q.defer();
        db.find({},function(err,res){
          if(err) deferred.reject(err);
          else deferred.resolve(res);
        });
        return deferred.promise;
      }
  }
});

app.controller('mainController',function($scope,dbData) {
  $scope.formData = {};
  // when landing on the page, get all todos and show them
  $scope.songs = [];
  dbData.getAllSongs()
    .then(function(data){
        $scope.songs = data;
    });
});
