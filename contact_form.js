angular.module('gdgorgua',[])
.controller('contactForm', function($scope,$http, $window) {
  if ($window.localStorage) {
	var user = $window.localStorage.getItem('user');
	if (user) {
		  $http.get('api/participant.json',{params:{uid:user}}).then(function(r){ $scope.user = r.data});
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
	  var uid = r.data.uid;
	  if ($window.localStorage) $window.localStorage.setItem('user', JSON.stringify(uid));
       }
    } 
    $http.post('api/participant.save.json', $scope.user).then(savedCb, savedCb);
  }
});