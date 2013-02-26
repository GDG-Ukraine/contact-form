angular.module('gdgorgua',[])
.controller('contactForm', function($scope,$http, $window, $location) {
  if ($window.localStorage) {
	var user = $window.localStorage.getItem('user');
	if (user) {
	    $scope.user = JSON.parse(user);
		  //$http.get('api/participant.json',{params:{uid:user}}).then(function(r){ $scope.user = r.data});
	}
  }

  $scope.submit = function() {
    if (!$scope.contactForm.$valid) return;
    console.log("Saving");
    $scope.showOk = false;
    $scope.saving = true;
    $scope.showError = false;
    var savedCb = function(r) {
       $scope.saving = false;
       if (r.status != 200) {
	  $scope.showError = true;
       		console.log(r);
       } else {
	  $scope.showOk = true;
	  //var uid = r.data.uid;
	  if ($window.localStorage) $window.localStorage.setItem('user', JSON.stringify($scope.user));
       }
    } 
    var parts = $window.location.pathname.split('/');
    if (parts[0] == '') parts.shift();
    var event = parts[0];

    //$http.post('api/participant.save.json', {user: $scope.user, event: event}).then(savedCb, savedCb);
    $http.post('http://gdg.org.ua:11010/api/participants/add', {user: $scope.user, event: event}).then(savedCb, savedCb);
  }
});