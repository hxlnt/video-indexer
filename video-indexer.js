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
        console.log(`HTTP REQUEST STATUS: ${result.statusCode}. Delete breakdown complete. Result: ${result.body}`);
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
        console.log(`HTTP REQUEST STATUS: ${result.statusCode}. Get breakdown complete. Result: ${result.body}`);
        return result.body;
    });
}

Vindexer.prototype.getInsightsWidgetUrl = function() {

}

Vindexer.prototype.getInsightsWidgetUrlById = function() {

}

Vindexer.prototype.getPlayerWidgetUrl = function() {

}

Vindexer.prototype.getProcessingState = function() {

}

Vindexer.prototype.getVttUrl = function() {

}

Vindexer.prototype.reindexBreakdown = function() {

}

Vindexer.prototype.reIndexBreakdownByExternalId = function() {

}

Vindexer.prototype.search = function() {

}

Vindexer.prototype.updateFaceName = function() {

}

Vindexer.prototype.updateTranscript = function() {

}

Vindexer.prototype.uploadVideo = function(params) {
// Work in progress
//     if (!params.name) { params.name = `video_${_uuid.v4()}`; }
//     if (!params.privacy) { params.privacy = 'Private'; }
//     if (!params.videoUrl && !params.videoData) { throw err('ERROR! :('); }
//     if (params.videoUrl && !params.videoData) { let videodata = ''; }
//     _Request.post({
//         url: `${apiurl}Breakdowns`,
//         method: "POST",
//         qs: params,
//         headers: { "Ocp-Apim-Subscription-Key": this.apiKey },
//         formData: videodata
//     }).then(function (result) { 
//         console.log(`HTTP REQUEST STATUS: ${result.statusCode}. Upload video complete. Result: ${result.body}`);
//         return result.body;
//     });
}

module.exports = Vindexer;

