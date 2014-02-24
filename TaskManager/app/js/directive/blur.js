//* taken from: http://stackoverflow.com/questions/14684877/angular-clear-form-input-after-submit
angular.module('taskManager.dashboard').directive('blur', function () {
    return function (scope, element, attrs) {
        scope.$watch(attrs.blur, function () {
            element[0].blur();
        });
    };
});