angular.module('taskManager.dashboard').
        controller('ChildTaskController', ['$scope', 'ChildTaskService', 'task', function ($scope, ChildTaskService, task) {
             debugger;
            $scope.model = task;
            $scope.createChildTask = function (id, child) {
                ChildTaskService.createChildTask(id, child);
            }
        }]);