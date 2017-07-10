'use strict'

const _Promise = require('bluebird');
const _Request = _Promise.promisify(require('request'));
const _uuid = require('uuid');
const apiurl = "https://videobreakdown.azure-api.net/Breakdowns/Api/Partner";

var Vindexer = function(apikey) { 
    this.apiKey = apikey; 
}

Vindexer.prototype.getAccounts = function() {
    _Request({
        url: `${apiurl}/Accounts`,
        method: "GET",
        headers: { "Ocp-Apim-Subscription-Key": this.apiKey }
    }).then(function(result){
        console.log(`HTTP REQUEST STATUS: ${result.statusCode}. Get accounts complete. Result: ${result.body}`);
        return result.body;
    });
}

Vindexer.prototype.deleteBreakdown = function(id, params) {
    _Request({
        url: `${apiurl}/Breakdowns/${id}`,
        method: "DELETE",
        qs: params,
        headers: { "Ocp-Apim-Subscription-Key": this.apiKey }
    }).then(function(result) { 
        console.log(`HTTP REQUEST STATUS: ${result.statusCode}. Delete breakdown call complete. Result: ${result.body}`);
        return result.body;
    });
}

Vindexer.prototype.getBreakdown = function(id, params) {
    _Request({
        url: `${apiurl}/Breakdowns/${id}`,
        method: "GET",
        qs: params,
        headers: { "Ocp-Apim-Subscription-Key": this.apiKey }
    }).then(function (result) { 
        console.log(`HTTP REQUEST STATUS: ${result.statusCode}. Get breakdown call complete. Result: ${result.body}`);
        return result.body;
    });
}

Vindexer.prototype.getInsightsWidgetUrl = function(id, params) {
    _Request({
        url: `${apiurl}/Breakdowns/${id}/InsightsWidgetUrl`,
        method: "GET",
        qs: params,
        headers: { "Ocp-Apim-Subscription-Key": this.apiKey }
    }).then(function (result) { 
        console.log(`HTTP REQUEST STATUS: ${result.statusCode}. Get Insights Widget call complete. Result: ${result.body}`);
        return result.body;
    });
}

Vindexer.prototype.getInsightsWidgetUrlByExternalId = function(externalid, params) {
    _Request({
        url: `${apiurl}/Breakdowns/${externalid}/GetInsightsWidgetUrlByExternalId`,
        method: "GET",
        qs: params,
        headers: { "Ocp-Apim-Subscription-Key": this.apiKey }
    }).then(function (result) { 
        console.log(`HTTP REQUEST STATUS: ${result.statusCode}. Get Insights Widget By External ID call complete. Result: ${result.body}`);
        return result.body;
    });
}

Vindexer.prototype.getPlayerWidgetUrl = function(id) {
    _Request({
        url: `${apiurl}/Breakdowns/${id}/PlayerWidgetUrl`,
        method: "GET",
        headers: { "Ocp-Apim-Subscription-Key": this.apiKey }
    }).then(function (result) { 
        console.log(`HTTP REQUEST STATUS: ${result.statusCode}. Get Player Widget URL call complete. Result: ${result.body}`);
        return result.body;
    });
}

Vindexer.prototype.getProcessingState = function(id) {
    _Request({
        url: `${apiurl}/Breakdowns/${id}/State`,
        method: "GET",
        headers: { "Ocp-Apim-Subscription-Key": this.apiKey }
    }).then(function (result) { 
        console.log(`HTTP REQUEST STATUS: ${result.statusCode}. Get processing state call complete. Result: ${result.body}`);
        return result.body;
    });
}

Vindexer.prototype.getVttUrl = function(id, params) {
    _Request({
        url: `${apiurl}/Breakdowns/${id}/VttUrl`,
        method: "GET",
        qs: params,
        headers: { "Ocp-Apim-Subscription-Key": this.apiKey }
    }).then(function (result) { 
        console.log(`HTTP REQUEST STATUS: ${result.statusCode}. Get VTT URL call complete. Result: ${result.body}`);
        return result.body;
    });
}

Vindexer.prototype.reindexBreakdown = function(id, params) {
    _Request({
        url: `${apiurl}/Breakdowns/reindex/${id}`,
        method: "PUT",
        qs: params,
        headers: { "Ocp-Apim-Subscription-Key": this.apiKey }
    }).then(function (result) { 
        console.log(`HTTP REQUEST STATUS: ${result.statusCode}. Reindex breakdown call complete. Result: ${result.body}`);
        return result.body;
    });
}

Vindexer.prototype.reIndexBreakdownByExternalId = function(externalid, params) {
     _Request({
        url: `${apiurl}/Breakdowns/reindexbyexternalid/${externalid}`,
        method: "PUT",
        qs: params,
        headers: { "Ocp-Apim-Subscription-Key": this.apiKey }
    }).then(function (result) { 
        console.log(`HTTP REQUEST STATUS: ${result.statusCode}. Reindex breakdown by external ID call complete. Result: ${result.body}`);
        return result.body;
    });
}

Vindexer.prototype.search = function(params) {
    _Request({
        url: `${apiurl}/Breakdowns/Search`,
        method: "GET",
        qs: params,
        headers: { "Ocp-Apim-Subscription-Key": this.apiKey }
    }).then(function (result) { 
        console.log(`HTTP REQUEST STATUS: ${result.statusCode}. Search call complete. Result: ${result.body}`);
        return result.body;
    });
}

Vindexer.prototype.updateFaceName = function(id, faceid, name) {
     _Request({
        url: `${apiurl}/Breakdowns/UpdateFaceName/${id}?${faceid}&${name}`,
        method: "PUT",
        headers: { "Ocp-Apim-Subscription-Key": this.apiKey }
    }).then(function (result) { 
        console.log(`HTTP REQUEST STATUS: ${result.statusCode}. Update face name call complete. Result: ${result.body}`);
        return result.body;
    });
}

Vindexer.prototype.updateTranscript = function(id, language, vtt_text, params) {
    //  _Request({
    //     url: `${apiurl}/Breakdowns/UpdateTranscript/${id}?${language}`,
    //     method: "PUT",
    //     qs: params,
    //     headers: { 
    //         "Content-Type": "application/json",
    //         "Ocp-Apim-Subscription-Key": this.apiKey },
    //     body: vtt_text
    // }).then(function (result) { 
    //     console.log(`HTTP REQUEST STATUS: ${result.statusCode}. Update transcript call complete. Result: ${result.body}`);
    //     return result.body;
    // });
}

Vindexer.prototype.uploadVideo = function(videoUrl, params) {
// Work in progress
    params.videoUrl = videoUrl;
    if (!params.name) { params.name = `video_${_uuid.v4()}`; }
    if (!params.privacy) { params.privacy = 'Private'; }
    _Request({
        url: `${apiurl}/Breakdowns`,
        method: "POST",
        qs: params,
        headers: {  
            "Content-Type": "multipart/form-data",
            "Ocp-Apim-Subscription-Key": this.apiKey
        },
        formData: {}
    }).then(function (result) { 
        console.log(`HTTP REQUEST STATUS: ${result.statusCode}. Upload video call complete. Result: ${result.body}`);
        return result.body;
    });
}

module.exports = Vindexer;

