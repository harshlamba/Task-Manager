angular.module('taskManager.dashboard').
        controller('TaskEditorController', ['$scope', 'TaskManagerService', 'task', function ($scope, TaskManagerService, task) {
            $scope.model = task;

            $scope.onAddButtonClick = function (model) {
                // debugger;
                if ((model.id != undefined) || (model.id != null)) {
                    TaskManagerService.editTask();
                    alert("Task updated successfully");
                }
                else {
                    TaskManagerService.addTask(model);
                    alert("Task added successfully");
                }
                $scope.model = null;
                $scope.submitToggle = !$scope.submitToggle;
            }

            $scope.createChildTask = function (id, child) {
                TaskManagerService.createChildTask(id, child);
                alert("Child-task added successfully");
                $scope.child = null;
                $scope.submitToggle = !$scope.submitToggle;
            }
        }
        ]);