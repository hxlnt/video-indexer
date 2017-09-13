# video-indexer
This is a Node.js wrapper for the Microsoft Cognitive Services [Video Indexer API](https://www.videoindexer.ai/), currently in preview. Per the Video Indexer API website, its features include:

> - Convert audio to text based on acoustic language models
> - Find when each face appears in the video
> - Map and understand who spoke when
> - Extract text that appears in videos as overlay, slides or background
> - Understand who is the person that appears in the video
> - Separate background noise and voice activity
> - Detect when a scene changes based on visual analysis
> - Understand the level of positive vs. negative spoken or written content
> - Translate source audio into the language of your choice.
> - Detect and prevent explicit visual content
> - Find out the key words discussed in each segment
> - Automatically detect key frames

This Node.js module is still under development; it has been tested but is not guaranteed for production use. Issues and PRs welcome! :)

## Installation

`npm install video-indexer`


## Usage

Grab a free API key by signing up [here](https://videobreakdown.portal.azure-api.net/get-started) and clicking on your account name, then "Profile." Replace "your_api_key" below with the API key for local testing. 

```javascript
const vindexer = require("video-indexer");
const Vindexer = new vindexer("your_api_key");

// Upload video via a URL and generate intelligent insights. If no URL is specified, the file should be passed as a multipart/form body content.
Vindexer.uploadVideo({
    // Optional
    videoUrl: "http_://_video_url_dot_/video.mp4",
    name: 'My video name',
    privacy: 'Private', 
    language: 'English', 
    externalId: 'customvideoid',
    description: 'Check out this great demo video!',
    partition: 'demos'
})
    .then( function(result){ console.log (result.body) } );

// Get full insights from previously-processed video
Vindexer.getBreakdown("your_video_id")
    .then( function(result){ console.log (result.body) } );;
```

### More examples

Note that in the examples above and below, strings passed into functions are always required, while parameters that appear in the format of `{ this: 'that' }` are always optional.

```javascript
// Get user id and name associated with API Key
Vindexer.getAccounts()
    .then( function(result){ console.log (result.body) } );

// Get progress of video processing
Vindexer.getProcessingState("your_video_id")
    .then( function(result){ console.log (result.body) } );

// Search for videos within your own account
// If you want to test with a publicly-available dataset instead, 
// set searchInPublicAccount to true
Vindexer.search({
    // Optional
    privacy: 'Public',
    id: 'some_video_id',
    partition: 'some_partition',
    owner: 'some_owner',
    face: 'some_face',
    query: 'search_term',
    pageSize: 10,
    skip: 5,
    externalId: 'some_external_id',
    language: 'English',
    searchInPublicAccount: false
})
    .then( function(result){ console.log (result.body) } );

// Get video player widget URL
Vindexer.getPlayerWidgetUrl("your_video_id")
    .then( function(result){ console.log (result.body) } );

// Get insights widget
Vindexer.getInsightsWidgetUrl("your_video_id", {
    // Optional. Other widget types are 'People', 'Sentiment', and 'Search'. 
    // If left unspecified, the widget will include all insight types
    widgetType: 'Keywords'
})
    .then( function(result){ console.log (result.body) } );

// Get insights by external ID
Vindexer.getInsightsWidgetByExternalId("external_id")
    .then( function(result){ console.log (result.body) } );

// Get URL to VTT transcript
Vindexer.getVttUrl("your_video_id")
    .then( function(result){ console.log (result.body) } );

// Given a video ID and face ID, update the face with a name
Vindexer.updateFaceName("your_video_id", "face_id", "Person Name")
    .then( function(result){ console.log (result.body) } );

// Reindex a previously-processed video
Vindexer.reindexBreakdown("your_video_id", {
    // Optional
    callbackUrl: 'http_://_callbackurl_dot_com'
});

// Reindex a previously processed video by external ID
Vindexer.reIndexBreakdownByExternalId("external_id", {
    // Optional
    callbackUrl: 'http_://_callbackurl_dot_com'
})

// Delete video and, optionally, insights
Vindexer.deleteBreakdown("your_video_id", {
    // Optional
    deleteInsights: true
});

```


