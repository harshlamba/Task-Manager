/// <reference path="../model/task.js" />

angular.module('taskManager.dashboard').factory('ChildTaskService', ['$firebase', 'MindmapperService', function ($firebase, MindmapperService) {

    return {

        scheduleTask: function (id, schedule) {
            debugger;
            try {
                var task = MindmapperService.getTask(id); 
                if (null != task) {
                    task.start = schedule.start;
                    task.end = schedule.end;
                    task.reminder= schedule.reminder;
                    MindmapperService.editTask(task);
                }
            } catch (e) {
                alert(e);
            }
        },

        createChildTask: function (id, child) {
            debugger;
            try {
                var task = MindmapperService.getTask(id);
                if (null != task) {
                    if (undefined == task.childTask) {
                        task.childTask = [];
                    }
                    var childTask = new Task(id, Guid.New(), child.title, child.description);
                    task.childTask.push(childTask);
                    MindmapperService.editTask(task);
                }
            } catch (e) {
                alert(e);
            }
        }
    }
}

]);