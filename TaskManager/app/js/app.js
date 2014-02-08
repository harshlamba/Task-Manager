'use strict';


// Declare app level module which depends on filters, and services
/* angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/view1'});
}]); */

angular.module('taskManager', [
    'ngRoute',
    'taskManager.dashboard',
    'ui.bootstrap'
    //'ui-templates'
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/list-task', {
        templateUrl: 'app/partials/mind-mapper.html', controller: 'DashboardController', resolve: {
            taskList: function (MindmapperService) {                
                var taskList = MindmapperService.getAllTask();
                return taskList;
            }
        }
    }).
    when('/add-task', {
        templateUrl: 'app/partials/add-edit-task.html', controller: 'MindmapperController', resolve: {
            task: function () {
                return new Task();
            }
        }
    }).
  when('/edit-task/:taskId', {
      templateUrl: 'app/partials/add-edit-task.html', controller: 'MindmapperController', resolve: {
          task: function (MindmapperService, $route) {
              return MindmapperService.getTask($route.current.params.taskId);
          }
      }
  }).
    when('/schedule-task/:taskId', {
        templateUrl: 'app/partials/add-edit-schedule.html', controller: 'SchedularController', resolve: {
            task: function (MindmapperService, $route) {
                return MindmapperService.getTask($route.current.params.taskId);
            }
        }
    }).
    when('/createChild-task/:taskId', {
        templateUrl: 'app/partials/add-child-task.html', controller: 'ChildTaskController', resolve: {
            task: function (MindmapperService, $route) {
                return MindmapperService.getTask($route.current.params.taskId);
            }
        }
    }).
    when('/today-todo', {
        templateUrl: 'app/partials/myTodayToDo.html', controller: 'ToDoController', resolve: {
            todoList: function (MindmapperService) {
                var todoList = MindmapperService.getTodayTask();
                return todoList;
            }
        }
    }).
    otherwise({
        redirectTo: '/list-task'
    });
}]);