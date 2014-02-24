angular.module('taskManager.dashboard').
        controller('SchedularController', ['$scope', 'TaskManagerService', 'task', function ($scope, TaskManagerService, task) {
            $scope.model = task;
            if (task.start != 0) {
                // load existing schedule to be populated in controls
                var schedule = function () { };
                schedule.start = task.start;
                schedule.end = task.end;
                schedule.reminder = task.reminder;
                $scope.schedule = schedule;
            }

            $scope.scheduleTask = function (id, schedule) {
                TaskManagerService.scheduleTask(id, schedule);
                alert("Schedule set successfully");
                $scope.schedule = null;
                $scope.submitToggle = !$scope.submitToggle;
            }

            $scope.scheduleChildTask = function (parentId, childId, schedule) {               
                TaskManagerService.scheduleChildTask(parentId, childId, schedule);
                alert("Schedule set successfully");
                $scope.schedule = null;
                $scope.submitToggle = !$scope.submitToggle;
            }
        }]);