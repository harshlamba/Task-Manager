/// <reference path="../services/taskManagerService.js" />


angular.module('taskManager.dashboard').controller('newtaskandlistcontroller', ['$scope', 'TaskManagerService', function ($scope, TaskManagerService) {
   
   

    /* Task to add */
    var task = function () {
        return new Task();  // return an empty task object to be populated
    }
   // console.log($scope.model);
    $scope.model = task;

    /* Task list to show */
    $scope.getAllTasks = function () {
        debugger;
        TaskManagerService.init();
        $scope.taskList = TaskManagerService.getAllTasks();
    }

    $scope.onAddButtonClick = function (model) {
        // debugger;    
        if ((model.id != undefined) || (model.id != null))
            TaskManagerService.editTask();
        else
            TaskManagerService.addTask(model);

        alert("Task added successfully");
    }
    $scope.createChildTask = function (id, child) {
        TaskManagerService.createChildTask(id, child);
    }
}

]);