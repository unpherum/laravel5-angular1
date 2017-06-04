/**
custom input fields for both simple input field or input field
templateUrl: custom_input_control.view.html

Example:

CustomInput({
	name: "timeControlInput",
	restrict: 'E',
	templateUrl: './components/custom_input_control.view.html',
	clickSelectsAll: true,
	parser: parseTime,
	formatter: function(modelValue) {
		var inputValue = parseTime(""+modelValue);
		return (typeof inputValue == "string") ? inputValue : modelValue;
	}
});
**/


(function () {
    'use strict';

    function customInput(options){

		angular
	        .module('camsian.app')
	        .directive(options.name, customInputFunction);

	    customInputFunction = []; 
	    function customInputFunction() {
	    	var directive = {
				restrict: options.restrict,
				templateUrl: options.templateUrl,
				template: options.template,
				// variables and functions that pass in to the custom directive
				scope: {
	                model:'=',
	                disabled: '=',
	                ngChangeFunc: '='
	            },
				link: customInputLink,
				controller: customInputController,
	            controllerAs: 'dm', // using 'dm' to differentiate this is from directive
	            bindToController: true
			}
			
			return directive;
			
			function customInputLink (scope, element, attribute, ctrl) {

				var attr = element[0].querySelector('input').attributes;

				var elms = [].slice.call(element[0].querySelectorAll('[ng-model]'), 0);

				var elem = elms[0];

				var controllers = elms.map(function(el){ 
					return angular.element(el).controller('ngModel');
				});

				var ngModel = controllers[0];

				scope.dm.ngModel = ngModel;


				var input = $(element[0].querySelector('input'));
				var button = $(element[0].querySelector('button'));

				// might show virtual keyboard for a second and hide
				// to deselect the input field when it is first clicked
				input.focusin(function(){
					if(button.css('display') == 'none'){
						input.blur();
					}
				});

				// to select all for input field
				if (options.clickSelectsAll) {

					input.focusin(function(){
						if(button.css('display') != 'none'){
							input.select().mouseup(function (e) {
								e.preventDefault();
								input.unbind("mouseup");
							});
						}
					});

				}

				$(elem).bind('blur', function() {
					var viewValue = ngModel.$modelValue;
					if(viewValue != null && !$(elem).hasClass("fail")) {
						for (var i in ngModel.$formatters) {
							viewValue = ngModel.$formatters[i](viewValue);
						}
						ngModel.$viewValue = viewValue;
						ngModel.$render();
					}
				});

				ngModel.$parsers.unshift(function(inputValue) {
					inputValue = ""+(inputValue||"");
					if(attr.onBlank && !inputValue.length) {
						inputValue = attr.onBlank;
					}
					$(elem).removeClass("fail");
					var val = options.parser(inputValue);
					if(val !== false) {
						inputValue = val;
					}else{
						if(inputValue.length) { 
							$(elem).addClass("fail");
						}
						inputValue = (attr.default) ? options.parser(attr.default) : undefined;
					}
					return inputValue;
				});

				ngModel.$formatters.unshift(options.formatter);
			}


		}

		customInputController.$inject = [];
	    function customInputController() {
	        var dm = this;

	    }

	}

// ----------------------------------------------------------------------
// example:
// <time-control-input model="timeRecord[column.field_name]" 
// btn-diff=5 row-id="rowId" focus-func="selectRow(rowId)"></time-control-input>

	customInput({
		name: "timeInput",
		restrict: 'E',
		templateUrl: './scripts/common/custom_input_control.html',
		clickSelectsAll: true,
		parser: parseTime,
		formatter: function(modelValue) {
			var inputValue = parseTime(""+modelValue);
			return (typeof inputValue == "string") ? inputValue : modelValue;
		},
	});

	function parseTime(str){
		
		if(str===""){
			str = 0;
		}

		var text = str;

		if (typeof str === 'string' || str instanceof String){
			var text = str.toUpperCase();
		}
		text = String(text);
		text = text.replace(/(^\s+|\s+$)/g,'');

		var isAM = false;
		var isPM = false;
		
		// check if there is AM or PM text explicitly showing.
		var AMTextIndex = text.lastIndexOf("AM");
		var PMTextIndex = text.lastIndexOf("PM");
		if(AMTextIndex>0){
			text = text.substring(0,AMTextIndex).replace(/\s+$/g,'');
			isAM=true; 
		}else if(PMTextIndex>0){
			text = text.substring(0,PMTextIndex).replace(/\s+$/g,'');
			isPM=true; 
		}

		// if the rest is larger than 0
		var length = text.length;

		if(length){

			if(length <= 2 && /^\d{1,2}$/.test(text)) {

				var h = parseInt(text);
				text = parseTime_toString(h, 0, ((isPM || h > 11) && !isAM));

			}else if(length == 3 && /^[0-9][0-5][0-9]$/.test(text)) {

				var h = parseInt(text[0],10);
				text = parseTime_toString(h, parseInt(text.substring(1)), (isPM && !isAM));
			
			}else if(length == 4 && /^\d{4}$/.test(text)) {
				
				var h = parseInt(text.substring(0,2),10);
				text = parseTime_toString(h, parseInt(text.substring(2)), (isPM && !isAM));
			
			}else if(/^(\d{1,2})[\-\.\,\:\;\s](\d{1,2})$/.exec(text)) {
				var m = /^(\d{1,2})[\-\.\,\:\;\s](\d{1,2})$/.exec(text);
				var h = parseInt(m[1],10);
				text = parseTime_toString(h, parseInt(m[2],10), (isPM && !isAM));
			
			}

		}

		return (/^\d{2}:\d{2}$/.test(text)) ? text : false;
	}

	function parseTime_toString(hh, mm, isPM) {
	    
		if (hh < 24 && mm < 60) {
			if (isPM) {
				if (hh < 12) hh += 12;
			}
			// else hh %= 12;
			
			return ('0' + hh).substr(-2) + ":" + ('0' + mm).substr(-2);
		}
		
		return false;
	}

    function pad(n) { return ("0" + n).slice(-2); }

})();
