angular.module('taskManager.dashboard').
        controller('SecurityController', ['$scope', '$location', 'SecurityService',
            function ($scope, $location, SecurityService) {


                $scope.createUser = function (user) {
                    //debugger;
                    var status = SecurityService.createUser(user);
                    $scope.user = null;
                    $scope.submitToggle = !$scope.submitToggle;
                    alert(status);
                }
                $scope.login = function (user) {

                    var loginTask = SecurityService.login(user);
                    loginTask.then(function (userId) {
                       // debugger;
                        window.sessionStorage.setItem('userLoginId', userId);
                        $location.path("/home");
                        return;
                    });
                    $scope.user = null;
                    $scope.submitToggle = !$scope.submitToggle;
                }
            }
        ]);

