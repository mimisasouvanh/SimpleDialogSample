﻿/*Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. 
4  See LICENSE in the project root for license information */

var dialog;

function dialogCallback(asyncResult) {
    if (asyncResult.status == "failed") {
        showNotification(asyncResult.error.message);
    }
    else {
        dialog = asyncResult.value;
        /*Messages are sent by developers programatically from the dialog using office.context.ui.messageParent(...)*/
        dialog.addEventHandler(Microsoft.Office.WebExtension.EventType.DialogMessageReceived, messageHandler);

        /*Events are sent by the platform in response to user actions or errors. For example, the dialog is closed via the 'x' button*/
        dialog.addEventHandler(Microsoft.Office.WebExtension.EventType.DialogEventReceived, eventHandler);
    }
}


function messageHandler(arg) {
    showNotification(arg.message);
    dialog.close();
}


function eventHandler(arg) {
    switch (arg.error) {
        case 12002:
            showNotification("Cannot load URL, 404 not found?");
            break;
        case 12003:
            showNotification("Invalid URL Syntax");
            break;
        case 12004:
            showNotification("Domain not in AppDomain list");
            break;
        case 12005:
            showNotification("HTTPS Required");
            break;
        case 12006:
            showNotification("Dialog closed");
            break;
        case 12007:
            showNotification("Dialog already opened");
            break;
    }

}

function openAlertDialog() {
    Office.context.ui.displayDialogAsync("https://localhost:44328/Dialog.html",
        { height: 10, width: 30 }, dialogCallback);
}

function openClientDialog() {
    Office.context.ui.displayDialogAsync("https://localhost:44328/ClientDialog.html",
        { height: 50, width: 50 }, dialogCallback);
}



