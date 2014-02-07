angular.module('taskManager.dashboard').factory('ScheduleService', ['$firebase', 'MindmapperService', function ($firebase, MindmapperService) {

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
        }
    }
}

]);