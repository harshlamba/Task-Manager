/// <reference path="../lib/angular/angular.min.js" />
'use strict'


angular.module('taskManager', [
    'ngRoute',
    'taskManager.dashboard'
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: 'partials/home.html', controller: 'newtaskandlistcontroller' /*, resolve: {
            taskList: function (TaskManagerService) {
                var taskList = TaskManagerService.getAllTasks();
                return taskList;
            }           
        } */
    }).
    when('/add-task', {
        templateUrl: 'partials/add-edit-task.html', controller: 'TaskEditorController', resolve: {
            task: function () {
                return new Task();  // return an empty task object to be populated
            }
        }
    }).
    when('/edit-task/:taskId', {
        templateUrl: 'partials/add-edit-task.html', controller: 'TaskEditorController', resolve: {
            task: function (TaskManagerService, $route) {
                return TaskManagerService.getTask($route.current.params.taskId);
            }
        }
    }).
    when('/schedule-task/:taskId', {
        templateUrl: 'partials/add-edit-schedule.html', controller: 'SchedularController', resolve: {
            task: function (TaskManagerService, $route) {
                return TaskManagerService.getTask($route.current.params.taskId);
            }
        }
    }).
    when('/schedule-task/:taskId/:childTaskId', {
        templateUrl: 'partials/add-edit-schedule.html', controller: 'SchedularController', resolve: {
            task: function (TaskManagerService, $route) {
                return TaskManagerService.getTask($route.current.params.taskId);
            }
        }
    }).
    when('/createChild-task/:taskId', {
        templateUrl: 'partials/add-child-task.html', controller: 'TaskEditorController', resolve: {
            task: function (TaskManagerService, $route) {
                return TaskManagerService.getTask($route.current.params.taskId);
            }
        }
    }).
    when('/today-todo', {
        templateUrl: 'partials/my-to-do.html', controller: 'ToDoController', resolve: {
            todoList: function (TaskManagerService) {
                var todoList = TaskManagerService.getTodayTasks();
                return todoList;
            }
        }
    }).
    when('/create-user', {
        templateUrl: 'partials/create-user.html', controller: 'SecurityController'
    }).
    when('/login', {
        templateUrl: 'partials/login.html', controller: 'SecurityController'
    }).
    when('/create-category', {
        templateUrl: 'partials/create-category.html', controller: 'CategoryController'
    }).
    when('/categorize-task', {
        templateUrl: 'partials/categorize-task.html', controller: 'CategoryController'
    }).
    when('/organized-view/:categoryId', {
        templateUrl: 'partials/organized-tasks.html', controller: 'CategoryController'
    }).
         when('/about', {
             templateUrl: 'partials/about-us.html'
         }).
    otherwise({
        redirectTo: '/login'
    });
}]);