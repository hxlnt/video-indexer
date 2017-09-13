const vindexer = require('../video-indexer');
// For local testing, replace your_api_key with your Video Indexer API key. For production, store API key securely.
const Vindexer = new vindexer("your_api_key");

console.log(`Welcome to a simple testing app!`);


Vindexer.getAccounts()
    .then( function(result){ console.log (result.body) } );

/* Uncomment the lines, replacing the placeholder strings with a valid video ID or URL, to test these commands. More features coming soon!

Vindexer.uploadVideo({
    // Optional
    videoUrl: "http_://_video_url_dot_/video.mp4",
    name: 'My video name',
    privacy: 'Private', 
    language: 'English', 
    externalId: 'customvideoid',
    description: 'Check out this great demo video!',
    partition: 'demos',
    callbackUrl: 'http_://_callbackurl_dot_com'
})
    .then( function(result){ console.log (result.body) } );

Vindexer.getProcessingState("your_video_id")
    .then( function(result){ console.log (result.body) } );

Vindexer.getBreakdown("your_video_id")
    .then( function(result){ console.log (result.body) } );;

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

Vindexer.getPlayerWidgetUrl("your_video_id")
    .then( function(result){ console.log (result.body) } );

Vindexer.getInsightsWidgetUrl("your_video_id", {
    // Optional
    widgetType: 'Keywords'
})
    .then( function(result){ console.log (result.body) } );

Vindexer.getInsightsWidgetByExternalId("external_id")
    .then( function(result){ console.log (result.body) } );

Vindexer.getVttUrl("your_video_id")
    .then( function(result){ console.log (result.body) } );

Vindexer.updateFaceName("your_video_id", "face_id", "Person Name")
    .then( function(result){ console.log (result.body) } );

Vindexer.reindexBreakdown("your_video_id", {
    // Optional
    callbackUrl: 'http_://_callbackurl_dot_com'
});

Vindexer.reIndexBreakdownByExternalId("external_id", {
    // Optional
    callbackUrl: 'http_://_callbackurl_dot_com'
});

Vindexer.deleteBreakdown("your_video_id", {
    // Optional
    deleteInsights: true
});


*/