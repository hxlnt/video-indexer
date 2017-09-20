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

Vindexer.prototype.getProcessingState = function(id) {
    return _Request.getAsync({
        url: `${apiurl}/Breakdowns/${id}/State`,
        headers: { "Ocp-Apim-Subscription-Key": this.apiKey }
    })
}

Vindexer.prototype.getVttUrl = function(id, params) {
    return _Request.getAsync({
        url: `${apiurl}/Breakdowns/${id}/VttUrl`,
        qs: params,
        headers: { "Ocp-Apim-Subscription-Key": this.apiKey }
    })
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
    })
}

module.exports = Vindexer;
