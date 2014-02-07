/// <reference path="../model/task.js" />


angular.module('taskManager.dashboard').factory('MindmapperService', ['$firebase', function ($firebase) {

    var firebaseDataUrl = "https://nitinsingh.firebaseio.com/Tasks/Task";
    var tasksRef = new Firebase(firebaseDataUrl);
    var totalTaskList = null;
    totalTaskList = $firebase(tasksRef);
    tasksRef.on('child_added', function (snapshot) {
        // debugger;
        if (null != snapshot) {
            var msgData = snapshot.val();
            msgData.id = snapshot.name();
        }
    });

    return {

        getAllTask: function () {

            return totalTaskList;
        },
        addTask: function (taskDetails) {
            try {
                // debugger; 
                var task = new Task(0, Guid.New(), taskDetails.title, taskDetails.description)
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
        deleteTask: function (taskId) {

        },
        getTask: function (taskId) {
            //// alert("Getting task: " + taskId);
            // var childUrl = firebaseDataUrl + "/" + taskId;
            // var childTaskRef = new Firebase(childUrl);
            // var item = $firebase(childTaskRef);
            // return item;
            //return totalTaskList[taskId];
            var t = totalTaskList[taskId];
            return t;
        }
    };
}]);



/*
var auth = new FirebaseSimpleLogin(tasksRef, function (error, user) {
    debugger;
    if (error) {
        // an error occurred while attempting login
        console.log(error);
    } else if (user) {
        // user authenticated with Firebase
        alert("You have now logged in to the application");
        console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
        $scope.IsAuthenticated = true;
        $scope.$apply();
    } else {
        // user is logged out
    }

});
auth.login('password', {
    email: "nitin@nitinsingh.com", // $scope.userEmailId,
    password: "chirpatti" // $scope.userPassword
});

*/