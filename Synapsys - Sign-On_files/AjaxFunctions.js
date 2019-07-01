
function getXMLHttpRequestObject() {
    var request;

    try {
        request = new XMLHttpRequest();
    } catch (e) {
        try {
            request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                request = new ActiveXObject("Microsoft.XMLHTTP");

            } catch (e) { }
        }
    }

    return request;
}


function loadApp(appName) {
    var parameters = '"appName":"' + appName + '"';
    CallServerSideFunctionSync("Default.aspx", "LoadClientApp", parameters, "False");
}

function CallServerSideFunctionSync(currentPageURL, serverSideFunctionName, parametersToPass, valueToUseWhenProcessFailed) {
    //parameters to pass should be in the following format: '"parmeter1":"value1", "parameter2":"value2"' - as many parameters as needed
    //server should have function with the name specified in the [serverSideFunctionName] and parameters specified in  parametersToPass
    //********* !!!!!!!!!!!!!!!!!!  MAKE SURE PARAMETERS NAMES SPELLED JUST AS THEY ARE IN THE SERVER SIDE FUNCTION !!!!!!!!!!!!!!! ********
    var retVal = valueToUseWhenProcessFailed;

    if (!parametersToPass) parametersToPass = '';


    $.ajax({
        type: "POST",
        url: currentPageURL + "/" + serverSideFunctionName,
        data: '{' + parametersToPass + '}',
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            retVal = result.d;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown);
            alert("Exception occurred in AJAX Call to the " + serverSideFunctionName + " function of the " + currentPageURL + ". Parameters passed: " + parametersToPass);
        }
    });

    return retVal;
}



function CallServerSideFunctionSyncNoParms(currentPageURL, serverSideFunctionName, valueToUseWhenProcessFailed) {

    var retVal = valueToUseWhenProcessFailed;

    $.ajax({
        type: "POST",
        url: currentPageURL + "/" + serverSideFunctionName,
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        success: function (result) { retVal = result.d; },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown);
            alert("Exception occurred in AJAX Call to the " + serverSideFunctionName + " function of the " + currentPageURL + ". Parameters passed: " + parametersToPass);
        }
    });

    return retVal;
}