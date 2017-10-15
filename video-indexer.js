'use strict'

const _Promise = require('bluebird');
const _Request = _Promise.promisifyAll(require('request'));
const _uuid = require('uuid');
const apiurl = "https://videobreakdown.azure-api.net/Breakdowns/Api/Partner";

var Vindexer = function(apikey) { 
    this.apiKey = apikey;
}

Vindexer.prototype.getAccounts = function() {
    return _Request.getAsync({
        url: `${apiurl}/Accounts`,
        headers: { "Ocp-Apim-Subscription-Key": this.apiKey }
    })
}

Vindexer.prototype.deleteBreakdown = function(id, params) {
    return _Request.deleteAsync({
        url: `${apiurl}/Breakdowns/${id}`,
        qs: params,
        headers: { "Ocp-Apim-Subscription-Key": this.apiKey }
    })
}

Vindexer.prototype.getBreakdown = function(id, params) {
    return _Request.getAsync({
        url: `${apiurl}/Breakdowns/${id}`,
        qs: params,
        headers: { "Ocp-Apim-Subscription-Key": this.apiKey }
    })
}

Vindexer.prototype.getInsightsWidgetUrl = function(id, params) {
    return _Request.getAsync({
        url: `${apiurl}/Breakdowns/${id}/InsightsWidgetUrl`,
        qs: params,
        headers: { "Ocp-Apim-Subscription-Key": this.apiKey }
    })
}

Vindexer.prototype.getInsightsWidgetUrlByExternalId = function(externalid, params) {
    return _Request.getAsync({
        url: `${apiurl}/Breakdowns/${externalid}/GetInsightsWidgetUrlByExternalId`,
        qs: params,
        headers: { "Ocp-Apim-Subscription-Key": this.apiKey }
    })
}

Vindexer.prototype.getPlayerWidgetUrl = function(id) {
    return _Request.getAsync({
        url: `${apiurl}/Breakdowns/${id}/PlayerWidgetUrl`,
        headers: { "Ocp-Apim-Subscription-Key": this.apiKey }
    })
}

Vindexer.prototype.getProcessingState = function getProcessingState(id) {
    return _Request.getAsync({
        url: `${apiurl}/Breakdowns/${id}/State`,
        headers: { "Ocp-Apim-Subscription-Key": this.apiKey }
    }).bind(this);
}

Vindexer.prototype.getVttUrl = function(id, params) {
    return _Request.getAsync({
        url: `${apiurl}/Breakdowns/${id}/VttUrl`,
        qs: params,
        headers: { "Ocp-Apim-Subscription-Key": this.apiKey }
    })
}

Vindexer.prototype.downloadVtt = function(vttUrl) {
    return _Request.getAsync({
        url: vttUrl
    });
}

Vindexer.prototype.reindexBreakdown = function(id, params) {
    return _Request.putAsync({
        url: `${apiurl}/Breakdowns/reindex/${id}`,
        qs: params,
        headers: { "Ocp-Apim-Subscription-Key": this.apiKey }
    })
}

Vindexer.prototype.reIndexBreakdownByExternalId = function(externalid, params) {
    return _Request.putAsync({
        url: `${apiurl}/Breakdowns/reindexbyexternalid/${externalid}`,
        qs: params,
        headers: { "Ocp-Apim-Subscription-Key": this.apiKey }
    })
}

Vindexer.prototype.search = function(params) {
    return _Request.getAsync({
        url: `${apiurl}/Breakdowns/Search`,
        qs: params,
        headers: { "Ocp-Apim-Subscription-Key": this.apiKey }
    })
}

Vindexer.prototype.updateFaceName = function(id, faceid, name) {
    return _Request.putAsync({
        url: `${apiurl}/Breakdowns/UpdateFaceName/${id}?${faceid}&${name}`,
        headers: { "Ocp-Apim-Subscription-Key": this.apiKey }
    })
}

Vindexer.prototype.updateTranscript = function(id, language, vtt_text, params) {
    //  return _Request.putAsync({
    //     url: `${apiurl}/Breakdowns/UpdateTranscript/${id}?${language}`,
    //     qs: params,
    //     headers: { 
    //         "Content-Type": "application/json",
    //         "Ocp-Apim-Subscription-Key": this.apiKey },
    //     body: vtt_text
    // })
}

Vindexer.prototype.uploadVideo = function(params) {
    let generatedId = _uuid.v4();
    if (!params.name) { params.name = `video_${generatedId}`; }
    if (!params.privacy) { params.privacy = 'Private'; }
    if (!params.fileName) { params.fileName = generatedId }

    let formData = {};

    if(params.streamData) {
        formData = { file: 
            { value: params.streamData,
              options: 
               { filename: params.fileName,
                 contentType: null } } }
    }

    return _Request.postAsync({
        url: `${apiurl}/Breakdowns`,
        qs: params,
        headers: {  
            "Content-Type": "multipart/form-data",
            "Ocp-Apim-Subscription-Key": this.apiKey
        },
        formData: formData
    }).bind(this);
}

//Meta-method to poll the processing status and resolve the promise when complete
Vindexer.prototype.waitForProcessing = function(id) {
    var _self = this;
    return new Promise(function(resolve) {
        var cps = checkProcessingStatus.bind(_self);
        cps(resolve, id);
    });
}

function checkProcessingStatus(resolve, id, previousPercent) {
    this.getProcessingState(id).then(function (result) {     
        let percent = 0;

        if(!previousPercent && previousPercent !== 0) {
            previousPercent = -1;
        }
        if(result) {
            //first call
            var resultObj = JSON.parse(result.body);
            //console.log(result.body);
            let percentString = resultObj.progress;

            if(resultObj.state === 'Processed') {
                percent = 100;
            } else if(resultObj.ErrorType) {
                //Occasionally the service isn't fast enough to reply after uploading
                console.log(`Server reported error, assuming 0% processed. Error: ${resultObj.ErrorType}`)
                percent = 0;
            } else if(percentString.length > 0) {
                percent = parseInt(percentString.substring(0, percentString.length - 1));
            }
        }        
        
        //console.log(percentString);

        //console.log(percent + '% ' + previousPercent + '(prev)');
        if(percent !== previousPercent) {
            console.log(percent + '% Complete');
        }
        
        if(percent === 100) {
            resolve(id);
        } else {
            //console.log('Calling with percent ' + percent);
            var cps = checkProcessingStatus.bind(this);
            setTimeout(function() { cps(resolve, id, percent); }, 3000);
        }
    });
}

module.exports = Vindexer;
