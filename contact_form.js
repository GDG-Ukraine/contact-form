angular.module('gdgorgua',[])
.controller('contactForm', function($scope,$http, $window) {
  if ($window.localStorage) {
	var user = $window.localStorage.getItem('user');
	if (user) $scope.user = JSON.parse(user);
  }
  $http.get('api/participant.json').then(function(r){ $scope.user = r.data});

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
	  if ($window.localStorage) $window.localStorage.setItem('user', JSON.stringify($scope.user));
       }
    } 
    $http.post('api/participant.save.json', $scope.user).then(savedCb, savedCb);
  }
});