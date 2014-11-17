/**
 *
 * FormSaveReminder
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

    var FormSaveReminder_docheck = true;
    var FormSaveReminder_message = config.FormSaveReminder.message;



    // functions to add and remove the check , so we can toggle in case
    // of submit button click tinymce alters content so check would trigger
    // an unwanted alert

    var FormSaveReminderAddCheck = function (){
        window.onbeforeunload = function() {
            return FormSaveReminder_message;
        }
    };

    var FormSaveReminderRemoveCheck = function (){
        window.onbeforeunload = null;
    };


    /**
     * submit "save" buttons are exluded
     */
    $('button[type="submit"], input[type="submit"], button[id="submit_delete"]')
        .addClass('noWarn')
        .click(function() {
            FormSaveReminder_docheck = false; // we set to false, to surpress tinymce firing onchange and being dirty
            FormSaveReminderRemoveCheck();
        // continue saving...
        });


    /**
    * Add all regular form input checks
    */
    $('input, textarea, select', 'form ul.Inputfields').one('change',function() {
        FormSaveReminderAddCheck();
    });

    /**
     * For sortables we check jquery ui sortable event sortupdate
     */
    $('.ui-sortable').live("sortupdate", function(){
        // console.log("check sortable");
        FormSaveReminderAddCheck();
    });


    /**
     * TinyMCE
     * ------------------------------------------------------------------------
     */


    // TinyMCE check if content has changed
    var FormSaveReminder_TinyMCE_change = function(ed) {
        if(ed.isDirty() && FormSaveReminder_docheck) {
            // the data changed
            FormSaveReminderAddCheck();
        }
    };

    $(".InputfieldTinyMCE textarea").each(function() {
        config[this.id].onchange_callback = FormSaveReminder_TinyMCE_change;
        config[this.id].execommand_callback = FormSaveReminder_TinyMCE_change;
    });


    /**
     * CKeditor
     * ------------------------------------------------------------------------
     */

    var FormSaveReminder_CKeditor_change = function(ed){
        if(ed.checkDirty() && FormSaveReminder_docheck){
            FormSaveReminderAddCheck();
        }
    };

    var FormSaveReminderAddCKeditorListener = function(){
        if(typeof CKEDITOR == "undefined") return;
        for (var i in CKEDITOR.instances) {
            CKEDITOR.instances[i].on('change',function() {
                FormSaveReminder_CKeditor_change(CKEDITOR.instances[i]);
            });
        }
    };

    // first time call, for initially loaded editors
    FormSaveReminderAddCKeditorListener();

    /**
     * look for ckeditor inline modes and add event listener
     * after a mouseover (when PW initializes the inline ckeditor too) but only the first time.
     * We add a timeout to wait to load all editors on a page
     */
    var $FormSaveReminder_CKeditorInlines = $(".InputfieldCKEditorInline[contenteditable=true]");
    if($FormSaveReminder_CKeditorInlines.size() > 0) {
        $FormSaveReminder_CKeditorInlines.mouseover(function(e) {
            if(typeof CKEDITOR == "undefined") return;
            if($(this).hasClass("FormSaveReminderLoaded")) return;
            if($(this).addClass("FormSaveReminderLoaded"));
            setTimeout(function(){
                for (var i in CKEDITOR.instances) {
                    CKEDITOR.instances[i].on('change',function() {
                        FormSaveReminder_CKeditor_change(CKEDITOR.instances[i]);
                    });
                }
            }, 500);
        });
    }




});

