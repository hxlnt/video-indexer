# video-indexer
This is a Node.js wrapper for the Microsoft Cognitive Services [Video Indexer API](https://www.videoindexer.ai/), currently in preview. 

This module is still under ongoing development; not complete nor suitable for production use! PRs welcome! :)

## Installation
`npm install video-indexer`

## Usage
```
const vindexer = require('video-indexer');
const Vindexer = new vindexer("your_api_key");

// Get user id and name
Vindexer.getAccounts();

// Delete video insights from processed video
Vindexer.deleteBreakdown("your_video_id", {deleteInsights: [true | false]});

// Get video insights from processed video
Vindexer.getBreakdown("your_video_id");

```
