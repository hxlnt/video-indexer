const vindexer = require('../video-indexer');
const Vindexer = new vindexer("your_api_key");

console.log(`Welcome to a simple testing app!`);

Vindexer.getAccounts();

/* Uncomment the lines, replacing your_video_id with a valid video ID, to test these commands. More features coming soon!

Vindexer.deleteBreakdown("your_video_id", {deleteInsights: true});
Vindexer.getBreakdown("your_video_id");

*/