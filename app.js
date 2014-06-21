'use strict';

/**
 * @ngdoc overview
 * @name bwinApp
 * @description
 * # bwinApp
 *
 * Main module of the application.
 */
var app = angular
    .module('bwinApp', [
       'bwModule'
    ]);
app.controller('MainController', function ($scope) {
    $scope.headerContent = 'Please provide some action';
    $scope.bodyContent = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';
    $scope.dialogTimeout = 10;
    $scope.closeDialog = function () {
        console.log('hide');
    };
    $scope.okDialog = function () {
        console.log('ok');
    };
    $scope.cancelDialog = function () {
        console.log('cancel');
    };
    $scope.throwError = function () {
        $scope.$broadcast('error');
    };
});
angular.module('bwModule', []).directive('bwDialog', ['$interval', '$document', function ($interval, $document) {
    return{
        transclude: true,
        restrict: 'E',
        scope: {
            'header': '@dialogHeader',
            'timeout': '@dialogTimeout',
            'closeAction': '&dialogOnClose',
            'okAction': '&dialogOnOk',
            'cancelAction': '&dialogOnCancel',
            'allowDrag': '@dialogAllowDrag',
            'listenBroadcast': '@dialogListenBroadcast'
        },
        templateUrl: 'temp.html',
        link: function (scope, element, attrs) {
            scope.showCancel = (attrs.dialogOnCancel === '') ? false : true;
            scope.showOk = (attrs.dialogOnCancel === '') ? false : true;
            scope.showClose = (attrs.dialogOnClose === '') ? false : true;
            scope.isShowing = false;
            var timeoutId;
            var startX = 0, startY = 0, x = 0, y = 0;
            var seconds = 0;
            var originTimeout = 0;
            var elementDraggable = angular.element(document.querySelector('#bw-draggable'));
            var elementClose = angular.element(document.querySelector('#bw-close'));
            var elementOk = angular.element(document.querySelector('#bw-ok'));
            var elementCancel = angular.element(document.querySelector('#bw-cancel'));

            function updateTime() {
                scope.timeout = seconds;
            }

            function mousemove(event) {
                y = event.pageY - startY;
                x = event.pageX - startX;
                element.css({
                    top: y + 'px',
                    left: x + 'px'
                });
            }

            function mouseup() {
                $document.off('mousemove', mousemove);
                $document.off('mouseup', mouseup);
            }

            function hideDialog() {
                $interval.cancel(timeoutId);
                scope.timeout = originTimeout;
                scope.isShowing = false;
            }

            function showDialog() {
                if (!isNaN(scope.timeout)) {
                    seconds = parseInt(scope.timeout);
                    if (seconds > 0) {
                        scope.isShowing = true;
                        originTimeout = seconds;

                        element.on('$destroy', function () {
                            $interval.cancel(timeoutId);
                        });
                        timeoutId = $interval(function () {
                            updateTime();
                            if (seconds >= 0) {
                                --seconds;
                            }
                            else {
                                hideDialog();
                            }
                        }, 1000);
                    }
                    else {
                        hideDialog();
                    }
                }
                else {
                    scope.isShowing = true;
                }
            }

            elementClose.on('click', function (event) {
                event.preventDefault();
                hideDialog();
                //scope.closeAction();
            });
            elementOk.on('click', function (event) {
                event.preventDefault();
                hideDialog();
                //scope.okAction();
            });
            elementCancel.on('click', function (event) {
                event.preventDefault();
                hideDialog();
                //scope.cancelAction();
            });
            if (scope.allowDrag) {
                element.css({
                    position: 'relative'
                });
                elementDraggable.css({
                    cursor: 'pointer'
                });

                elementDraggable.on('mousedown', function (event) {
                    // Prevent default dragging of selected content
                    event.preventDefault();
                    startX = event.pageX - x;
                    startY = event.pageY - y;
                    $document.on('mousemove', mousemove);
                    $document.on('mouseup', mouseup);
                });


            }
            if (scope.listenBroadcast !== '') {
                scope.$on(scope.listenBroadcast, function () {
                    showDialog();
                });
            }
        }
    };
}]);
