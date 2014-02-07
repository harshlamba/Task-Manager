angular.module('taskManager.dashboard').
    controller('todoController', ['$scope', 'MindmapperService', 'taskList', function ($scope, MindmapperService, taskList) {
        $scope.taskList = taskList;
    }]);