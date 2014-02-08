angular.module('taskManager.dashboard').
        controller('ToDoController', ['$scope', 'MindmapperService', function ($scope, MindmapperService) {
            debugger;

            $scope.todoList = MindmapperService.getTodayTask();

        }]);

