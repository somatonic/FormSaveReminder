# ProcessWire FormSaveReminder 1.0.2

This module adds a confirm dialog before leaving a page if its content has changed. Prevents losing unsaved data by accident. It does add this feature to all edit screens in the admin backend by default.

The module has following options to disable Form Save Reminder on certain edit screens.

- On edit Page
- On edit Template
- On edit Field
- On edit User, Role, Permission
- On edit Module

Download [FormSaveReminder](http://modules.processwire.com/modules/form-save-reminder/) from modules directory.

## How to install:

1. Download the zip file and put the folder renamed as "FormSaveReminder" into your site/modules/ folder
2. Login to processwire and got to Modules page and click "Check for new modules". You should see a note that a new module was found. Search for it in the list and click "install".
3. Done

## Known issues

- In some ocassion it can fail, when there's no change event thrown on an input field, that may even a custom module. However it can usually be fixed simply by adding a `$(element).trigger("change");` to the input textarea, input or select html object.
- There seems to be some issue with autocomplete page fields when adding items on the fly is enabled. I will look into this later

### update 1.0.2
- fixed issue with script adding (again)
- updated some texts and documentation

### update 1.0.1
- fixed issue with script adding
- fixed subdir installation path
- added script versioning