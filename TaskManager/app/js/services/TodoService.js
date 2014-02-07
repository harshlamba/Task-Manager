angular.module('taskManager.dashboard').
    factory('TodoService', ['$firebase', 'MindmapperService', function ($firebase, MindmapperService) {

        return {

            getTodoList: function () {
                
                try {
                    var taskList = MindmapperService.getAllTask();
                    if (taskList != null) {
                        var myTodayTasks = [];
                        var todayDate = new Date();
                        // remove the time component
                        todayDate.setHours(0, 0, 0, 0);
                        // Now iterate and get the tasks matching today's date
                        debugger;                       
                        //var indexes = taskList.$getIndex();
                        for (var task in taskList) {                        
                            if (task.childTasks != undefined) {
                                for (var childTask in task.childTask)
                                // var childTask = mainTask.childTasks[t];
                                if ((childTask.start <= todayDate) && (childTask.end >= todayDate)) {
                                    myTodayTasks.push(childTask);
                                }
                            }
                        }
                        return myTodayTasks;
                    }
                } catch (e) {
                    alert(e);
                }
            }
        }
    }

    ]);