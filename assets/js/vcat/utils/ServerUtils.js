function craftPollURL(url) {
    if (useProxy == "enabled") {
        return proxyURL+"?url="+encodeURI("https://"+url);
    } else {
        return "https://"+url;
    }
}

function craftMethodURL(methodType, methodName, methodParams, apiVersion) {
    if (useProxy == "enabled") {
        return proxyURL + '?url='+encodeURI('https://api.vk.com/method/'+methodType+'.'+methodName+'?access_token='+token+"&"+methodParams+"&v="+apiVersion);
    } else {
        return 'https://api.vk.com/method/'+methodType+'.'+methodName+'?access_token='+token+"&"+methodParams+"&v="+apiVersion;
    }
}

async function sendData(methodType, methodName, methodParams, apiVersion, callback, callbackError) {
    let result;
    try {
        result = await $.ajax({
            url: craftMethodURL(methodType, methodName, methodParams, apiVersion),
            type: 'GET'
        });
        console.log(result);
        if (useProxy == "enabled") {
            callback(JSON.parse(result))
        } else {
            callback(result);
        }
    } catch (error) {
        console.error(error);
        //callbackError(JSON.parse(result));
    }
}

async function sendAlternateData(methodType, methodName, methodParams, apiVersion, callback, callbackError) {
    let result;
    try {
        result = await $.ajax({
            url: "https://utkacraft.ru/vcat/proxy.php?url="+encodeURI('https://api.vk.com/method/'+methodType+'.'+methodName+'?access_token='+token+"&"+methodParams+"&v="+apiVersion),
            type: 'GET'
        });
        console.log(result);
        if (useProxy == "enabled") {
            callback(JSON.parse(result))
        } else {
            callback(result);
        }
    } catch (error) {
        console.error(error);
        //callbackError(JSON.parse(result));
    }
}
