/**
 *
 * FormSaveReminder 1.0.2
 *
 * @author Philipp 'Soma' Urlich philipp@urlich.ch
 * @created  2011/09/09
 *
 *
 * --------------------------------------------------
 *
 * ProcessWire 2.x
 * Copyright (C) 2010 by Ryan Cramer
 * Licensed under GNU/GPL v2, see LICENSE.TXT
 *
 * http://www.processwire.com
 * http://www.ryancramer.com
 *
 */


$(function() {

	// by default we let tinymce check,
	// if "submit" is pressed this flag this to false
	var docheck = true;

	// tinyMCE check if content has changed
	var TinyMCE_change = function(ed) {

	    if(ed.isDirty() && docheck) {
	        // the data changed
	        addCheck();
	    }
	};

	var addCheck = function (){
		window.onbeforeunload = function() {
			return 'Leaving this page will cause any unsaved data to be lost.';
		}
	};

	var removeCheck = function (){
		window.onbeforeunload = null;
	};

	/**
	* Add all form input checks
	*
	*/

	// exclude the save submit buttons from the check
	$('button[type="submit"],input[type="submit"]').addClass('noWarn');

	// add one time event on all form elements
   	$('input,textarea,select', 'form ul.Inputfields').one('change',function() {
		addCheck();
    });

	// for sortables we check jquery ui sortable event sortupdate
	$('.ui-sortable').live("sortupdate", function(){
		console.log("check sortable");
		addCheck();
	});

	// modify PW's JS config data for each TinyMCE instance
	$(".InputfieldTinyMCE textarea").each(function() {
		config[this.id].onchange_callback = TinyMCE_change;
		config[this.id].execommand_callback = TinyMCE_change;
	});

	$(".InputfieldMyTinyMCE textarea").each(function() {
		config[this.id].onchange_callback = TinyMCE_change;
		config[this.id].execommand_callback = TinyMCE_change;
	});

	// submit "save" buttons are exluded
   	$('.noWarn').click(function() {
		docheck = false; // we set to false, to surpress tinymce firing onchange and being dirty
		removeCheck();
		// continue saving...
	});

});

