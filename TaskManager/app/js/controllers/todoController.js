angular.module('taskManager.dashboard').
        controller('ToDoController', ['$scope', 'TaskManagerService', 'todoList', function ($scope, TaskManagerService, todoList) {

            $scope.title = "All tasks to be performed today";


            $scope.todoList = todoList;
        }]);

