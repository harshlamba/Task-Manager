/// <reference path="../model/task.js" />
/// <reference path="../lib/angular/angular.min.js" />

angular.module('taskManager.dashboard').factory('TaskManagerService', ['$firebase', 'CategoryService', function ($firebase, CategoryService) {

    var firebaseDataUrl = "https://nitinsingh.firebaseio.com/Tasks/Task";
    debugger;
    var userId = "";    
    var tasksRef = null;

    var totalTaskList = null;
    var todayTask = [];
    var catagorizedTasksCollection = [];    // this will have an array of categories and each category will have associated tasks within each

    initialize = function () {
        userId = window.sessionStorage.getItem('userLoginId');
        if (userId == "") {
            alert("Cannot get user id while getting tasks.... please login !!!")
            return;
        }

        tasksRef = new Firebase(firebaseDataUrl + "/" + userId + "/TaskList/");

        CategoryService.init();
        catagorizedTasksCollection = CategoryService.getCategoryCollection();
        debugger;

        // Track event to read all the tasks
        tasksRef.on('child_added', function (snapshot) {

            if (null != snapshot) {
                var msgData = snapshot.val();
                var taskCategory = msgData.categoryId;
                if (undefined != taskCategory) {
                    // process only categorized tasks
                    debugger;
                    for (var i in catagorizedTasksCollection) {
                        var cat = catagorizedTasksCollection[i];
                        if (cat.id == taskCategory) {
                            if (undefined == cat.childTasks) {
                                cat.childTasks = [];
                            }
                            cat.childTasks.push(msgData);
                            break;
                        }
                    }
                }

                if (msgData.start != undefined) {
                    var todayDate = new Date();
                    if ((Date.parse(msgData.start) <= todayDate) && (Date.parse(msgData.end) >= todayDate)) {
                        todayTask.push(msgData);
                    }
                }
            }
        });

        totalTaskList = $firebase(tasksRef);
    }

   


    return {

        init: initialize,

        getAllTasks: function () {
            return totalTaskList;
        },

        getTodayTasks: function () {
            return todayTask;
        },
        getTask: function (taskId) {
            //debugger;
            var t = totalTaskList[taskId];
            return t;
        },
        addTask: function (taskDetails) {
            try {
                if (undefined == taskDetails.description) {
                    taskDetails.description = "";
                }
                var task = new Task(0, Guid.New(), taskDetails.title, taskDetails.description);
                task.Schedule(0, 0, 0);
                task.priority = Priority.normal;
                var id = tasksRef.push(task).name();

                task.id = id; // put id into the data
                tasksRef.child(id).set(task);
            } catch (e) {
                alert("Error as follows: " + e);
            }
        },
        editTask: function () {
            totalTaskList.$save();
        },

        scheduleTask: function (id, schedule) {
            //debugger;
            try {
                var task = this.getTask(id);
                if (null != task) {
                    task.start = schedule.start;
                    task.end = schedule.end;
                    task.reminder = schedule.reminder;
                    this.editTask(task);
                }
            } catch (e) {
                alert(e);
            }
        },
        scheduleChildTask: function (parentId, childId, schedule) {
            try {
                var parentTask = this.getTask(parentId);
                //debugger;
                for (var i in parentTask.childTask) {
                    var child = parentTask.childTask[i];
                    if (child.id == childId) {
                        child.start = schedule.start;
                        child.end = schedule.end;
                        child.reminder = schedule.reminder;

                        // update parent schedule as well (parent has to start early and finish later)
                        if (Date.parse(parentTask.start) > Date.parse(child.start)) {
                            parentTask.start = child.start;
                        }
                        if (Date.parse(parentTask.end) < Date.parse(child.end)) {
                            parentTask.end = child.end;
                        }
                        if (Date.parse(parentTask.reminder) > Date.parse(child.reminder)) {
                            parentTask.reminder = child.reminder;
                        }

                        this.editTask(parentTask);

                        return;
                    }
                }
            } catch (e) {
                alert(e);
            }
        },

        createChildTask: function (id, child) {
            //debugger;
            try {
                var task = this.getTask(id);
                if (null != task) {
                    if (undefined == task.childTask) {
                        task.childTask = [];
                    }
                    var childTask = new Task(id, Guid.New(), child.title, child.description);
                    task.childTask.push(childTask);
                    this.editTask(task);
                }
            } catch (e) {
                alert(e);
            }
        },

        getTasksForCategory: function (categoryId) {
            //debugger;
            var categories = CategoryService.getCategoryCollection();
            for (var i in categories) {
                //debugger;
                var cat = new Category(categories[i].title, categories[i].description);
                cat.id = categories[i].id;

                if (cat.id == categoryId) {
                    return cat.childTasks;
                }
            }
        },

        getCategorizedTasks: function () {
            return catagorizedTasksCollection;
        }
    }
}
]);