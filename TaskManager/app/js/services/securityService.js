/// <reference path="../model/task.js" />
/// <reference path="../lib/angular/angular.min.js" />
/// <reference path="../../lib/firebase-simple-login/firebase-simple-login-debug.js" />

angular.module('taskManager.dashboard').factory('SecurityService', ['$firebase', '$q',
    function ($firebase, $q) {


    var _q = $q;

    var firebaseDataUrl = "https://nitinsingh.firebaseio.com/Tasks";
    var tasksRef = new Firebase(firebaseDataUrl + "/Task/");
    var userRef = new Firebase(firebaseDataUrl + "/Users/");
   
    var userList = $firebase(userRef);
    var userCollection = [];

    // Track event to read all the tasks
    userRef.on('child_added', function (snapshot) {
        if (null != snapshot) {
            var msgData = snapshot.val();
            //debugger;
            userCollection.push(msgData);
        }
    });


    return {

        createUser: function (user) {
            var auth = new FirebaseSimpleLogin(tasksRef, function(error, user) {
            });
            auth.createUser(user.email, user.password, function (error, user) {
                //debugger;
                if (!error) {
                    // User has been created in firebase, now add it to our auth data structure
                    var appUser = new User(Guid.New(), user.email);
                    userRef.push(appUser);

                    alert("User created successfully");
                } else
                {
                    alert("Couldn't create user because: " + error);
                }
            });
        },

        login: function (user) {
            var deferred = _q.defer();           
            
            var auth = new FirebaseSimpleLogin(tasksRef, function (error, user) {
             
                if (error) {
                    // an error occurred while attempting login
                    console.log(error);
                    alert("Login failure");
                    debugger;
                    deferred.reject(err);
                } else if (user) {
                    // user authenticated with Firebase                    
                    console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
                    // Now find out the login guid of user
                    for (var i in userCollection) {
                        if (userCollection[i].emailId == user.email) {                                                     
                           // alert("Logged in successfully");
                            //debugger;
                            deferred.resolve(userCollection[i].userId);
                            return;
                        }
                    }
                } else {
                    // user is logged out
                }               
            });

            auth.login('password', {
                email: user.email,
                password: user.password
            });

            return deferred.promise;
        }
    }
}]);