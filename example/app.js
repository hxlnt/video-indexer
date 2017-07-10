const vindexer = require('../video-indexer');
const Vindexer = new vindexer("your_api_key");

console.log(`Welcome to a simple testing app!`);

Vindexer.getAccounts();

/* Uncomment the lines, replacing the placeholder strings with a valid video ID or URL, to test these commands. More features coming soon!

Vindexer.uploadVideo("http_://_video_url_dot_com", {
    // Optional
    name: 'My video name',
    privacy: 'Private', 
    language: 'English', 
    externalId: 'customvideoid',
    description: 'Check out this great demo video!',
    partition: 'demos',
    callbackUrl: 'http_://_callbackurl_dot_com'
});

Vindexer.getProcessingState("your_video_id");

Vindexer.getBreakdown("your_video_id");

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
});

Vindexer.getPlayerWidgetUrl("your_video_id");

Vindexer.getInsightsWidgetUrl("your_video_id", {
    // Optional
    widgetType: 'Keywords'
});

Vindexer.getInsightsWidgetByExternalId("external_id");

Vindexer.getVttUrl("your_video_id");

Vindexer.updateFaceName("your_video_id", "face_id", "Person Name");

Vindexer.reindexBreakdown("your_video_id", {
    // Optional
    callbackUrl: 'http_://_callbackurl_dot_com'
});

Vindexer.reIndexBreakdownByExternalId("external_id", {
    // Optional
    callbackUrl: 'http_://_callbackurl_dot_com'
})

Vindexer.deleteBreakdown("your_video_id", {
    // Optional
    deleteInsights: true
});


*/