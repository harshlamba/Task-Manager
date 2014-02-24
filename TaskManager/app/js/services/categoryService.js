/// <reference path="../model/task.js" />
/// <reference path="../lib/angular/angular.min.js" />

angular.module('taskManager.dashboard').factory('CategoryService', ['$firebase', function ($firebase) {

    
    var categoryRef = null;
    var categoryCollection = [];
    var categoryList = null;

    var initialize = function () {

        var firebaseDataUrl = "https://nitinsingh.firebaseio.com/Tasks";
        var userId = window.sessionStorage.getItem('userLoginId');
        if (userId == "") {
            alert("Cannot get user id while getting categories.... please login !!!")
        }

        debugger;

        if (null == categoryRef) {
            categoryRef = new Firebase(firebaseDataUrl + "/Task/" + userId + "/Category/");

            categoryList = $firebase(categoryRef);


            // Track event to read all the tasks
            categoryRef.on('child_added', function (snapshot) {
                if (null != snapshot) {
                    var msgData = snapshot.val();
                    //debugger;
                    categoryCollection.push(msgData);
                }
            });
        }
    }

    return {
        init: initialize,

        createCategory: function (category) {
            try {
                var cat = new Category(category.title, category.description);
                var id = categoryRef.push(cat).name();
                cat.id = id; // put id into the data
                categoryRef.child(id).set(cat);
            } catch (e) {
                alert("Error as follows: " + e);
            }
        },

        getCategoryCollection: function () {
            return categoryCollection;
        },
        getAllCategories: function () {
            return categoryList;
        }

    }
}
]);