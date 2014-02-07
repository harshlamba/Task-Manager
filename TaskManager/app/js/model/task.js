//*** Class names should be Pascal case and properties should be camel case

// parentId: int, id: int, title:string, description:string
var Task = function (parentId, id, title, description) {
    var self = this;
    self.id = id;
    self.parentId = parentId;
    self.title = title;
    self.description = description;
    self.childTasks = [];
    self.priority = null;
}

Task.prototype.Schedule = function (start, end, reminder) {
    var self = this;
    self.start = start;
    self.end = end;
    self.reminder = reminder;
}

var Category = function (title, description) {
    var self = this;
    self.title = title;
    self.description = description;
    self.color = "";
}

 
// Enum for Category
var CategoryColor = {
    yellow: 1,
    red: 2
};

var Priority = {
    normal: 0,
    medium: 1,
    high: 2
} 

// Each category can have any number of tasks
Category.prototype.Tasks = [];

var TaskManager = function() {
     var self = this;
    self.TaskCategories = [];
}


// Test trial for entire entity
function TestSomeTasks() {
    //debugger;
    // Create the application object
    var myTaskManager = new TaskManager();

    // Create the base task (probably in mind manager)
    var learnAngular = new Task(0, 1, "Learn Angular.JS", "Need to learn angular to come upto project requirements");

    // Create child tasks in organizer
    var learnAngularDirective = new Task(1, 2, "Directives", "How & when to create user controls");
    var learnAngularModules = new Task(1, 3, "Modules", "How & when to create modules and their purpose");

    // Set priority of child tasks
    learnAngularDirective.priority = Priority.high;
    learnAngularModules.priority = Priority.medium;

    // Set schedule fo child tasks
    learnAngularDirective.Schedule(new Date(2014, 1, 6), new Date(2014, 1, 6) , new Date(2014, 1, 5) );
    learnAngularModules.Schedule(new Date(2014, 1, 6), new Date(2014, 1, 7) , new Date(2014, 1, 6) );

    // Put child tasks in main task
    learnAngular.childTasks.push(learnAngularDirective);
    learnAngular.childTasks.push(learnAngularModules);

    // Create some categories
    var newWebTechCategory = new Category("Upcoming Web Technologies", "New technologies coming out like angular, firebase etc");

    // Put the task in the category
    newWebTechCategory.Tasks.push(learnAngular);

    myTaskManager.TaskCategories.push(newWebTechCategory);

    // Try to get tasks which are due for today
    var myTodayTasks = [];
    myTodayTasks = GetTodayTasks(myTaskManager);

    var testMessage = "My today's tasks are as belows \n\n";
    for (var t in myTodayTasks) {
        testMessage += "Task #" + t + " is " + myTodayTasks[t].title + "\n";
    }
    alert(testMessage);
    
}

/// Get the tasks for today in the given task manager
function GetTodayTasks(taskManager) {
    var myTodayTasks = [];
    var todayDate = new Date();
    // remove the time component
    todayDate.setHours(0, 0, 0, 0);
    // Now iterate and get the tasks matching today's date
    for (var catId in taskManager.TaskCategories) {
        var category = taskManager.TaskCategories[catId];
        for (var mTaskId in category.Tasks) {
            var mainTask = category.Tasks[mTaskId];
            for (var t in mainTask.childTasks) {
                var childTask = mainTask.childTasks[t];
                if ((childTask.start <= todayDate) && (childTask.end >= todayDate)) {
                    myTodayTasks.push(childTask);
                }
            }
        }
    }
    return myTodayTasks;
}