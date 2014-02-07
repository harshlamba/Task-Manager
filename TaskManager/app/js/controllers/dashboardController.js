angular.module('taskManager.dashboard').
    controller('DashboardController', ['$scope', 'MindmapperService', 'taskList', function ($scope, MindmapperService, taskList) {
        $scope.taskList = taskList;        
    }]);

angular.module('taskManager.dashboard').
    controller('MindmapperController', ['$scope', 'MindmapperService', 'task', '$location', function ($scope, MindmapperService, task, $location) {
        $scope.model = task;
        $scope.onAddButtonClick = function (model) {
            if ((model.id != undefined) || (model.id != null))
                MindmapperService.editTask();
            else
                MindmapperService.addTask(model);

            $location.path("/list-task");
        }
    }]);