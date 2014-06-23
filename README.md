#  **bwDialog -  Angular Dialog Directive**
========
###  **Overview**: 
Simple directive specially for notification purposes.<br>
To use include dependency in your app
			```angular.module('app', ['bwModule']);```
And insert tag <br>
		```<bw-dialog></bw-dialog> ```
at the end of html file.
<br>Example:

        	<bw-dialog ng-hide="dialogIsHidden"
            dialog-listen-broadcast = "error"
            dialog-header="{{headerContent}}"
            dialog-on-close="closeDialog()"
            dialog-on-ok="okDialog()"
            dialog-on-cancel="cancelDialog()" 
            dialog-timeout="{{dialogTimeout}}"
            dialog-allow-drag="true">{{bodyContent}}
            </bw-dialog>
And the simple controller would be like<br>

		app.controller('MainController', function ($scope) {
            $scope.headerContent = 'Please provide some action';
            $scope.bodyContent = 'Lorem Ipsum ...';
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
###  Available options:<br>
→  `_dialog-allow-drag_` - Allow dialog box to be draggable <br>_(Default Boolean: `false`)_ <br><br>
→  `_dialog-listen-broadcast_` - Listen for broadcast <br>_(Default String: `empty`)_<br><br>
→  `_dialog-header_` - Header of dialog box <br>_(Default String: `empty`)_<br><br>
→  `_dialog-on-ok_` - Event name of function to be executed on dialog OK <br>(If not specified, OK button will not be shown) <br>_(Default String: `empty`)_ <br><br>
→  `_dialog-on-cancel_` - Event name of function to be executed on dialog Cancel <br>(If not specified, Cancel button will not be shown) <br>_(Default String: `empty`)_<br><br>
→  `_dialog-on-close_` - Event name of function to be executed on dialog Close <br>(If not specified, Close button will not be shown) <br>_(Default String: `empty`)_<br><br>
→  `_dialog-timeout_` - Timeout before dialog box close <br>(If not set, dialog will not close automatically) <br>_(Default Number: `10`)_<br><br>
-  [Demo](http://plnkr.co/edit/0oW4H38YNm2mjS7auw3f?p=preview)