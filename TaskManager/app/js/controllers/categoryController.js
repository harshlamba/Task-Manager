angular.module('taskManager.dashboard').
        controller('CategoryController', ['$scope', 'CategoryService', 'TaskManagerService', '$route', function ($scope, CategoryService, TaskManagerService, $route) {
            
            CategoryService.init();

            $scope.createCategory = function (category) {                
                CategoryService.createCategory(category);
                $scope.category = null;
                $scope.submitToggle = !$scope.submitToggle;
            }

            $scope.getTaskAndCategoryList = function () {
                
                $scope.taskList = TaskManagerService.getAllTasks();
                $scope.categoryList = CategoryService.getCategoryCollection();
                $scope.categoryObjects = CategoryService.getAllCategories();               
                if (undefined != $route.current) {
                    //debugger;
                    $scope.selectedCategoryId = $route.current.params.categoryId;
                    $scope.selectedCategoryTitle = $scope.categoryObjects[$scope.selectedCategoryId].title;
                }
            },

            $scope.categorySelected = function () {
               //debugger;
               $scope.currentCategory = $scope.categoryObjects[$scope.selectedCategory];
            }

            $scope.setCategoryTaskBinding = function (taskId, categoryId) {
               // debugger;
                var task = TaskManagerService.getTask(taskId);
                if (null != task) {
                    task.categoryId = categoryId;

                    TaskManagerService.editTask();
                }
            }            
        }
        ]);

