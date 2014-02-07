angular.module('taskManager.dashboard').
        controller('ToDoController', ['$scope', 'TodoService', function ($scope, TodoService) {
             //debugger;          
            $scope.onToDoLoad = function () {
             $scope.todoList = TodoService.getTodoList();
            }
        }]);