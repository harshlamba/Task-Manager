angular.module('taskManager.dashboard').
        controller('SchedularController', ['$scope', 'ScheduleService', 'task', function ($scope, ScheduleService, task) {
            // debugger;
            $scope.model = task;
            $scope.scheduleTask = function (id, schedule) {
                ScheduleService.scheduleTask(id, schedule);
            }
        }]);