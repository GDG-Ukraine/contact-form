angular.module('gdgorgua',[])
.controller('contactForm', function($scope,$http) {

  $scope.user = $http.get('api/participant.json').then(function(r){ $scope.user = r.data});

  $scope.submit = function() {
    $scope.showOk = false;
    $scope.saving = true;
    $scope.showError = false;
    var savedCb = function(r) {
       $scope.saving = false;
       if (status != 200) {
	  $scope.showError = true;
       		console.log(r);
       } else {
	  $scope.showOk = true;
       }
    } 
    $http.post('api/participant.save.json', $scope.user).then(savedCb, savedCb);
  }
});