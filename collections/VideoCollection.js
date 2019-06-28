var VideoCollection = Backbone.Collection.extend({
    url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=cats&type=video&key=AIzaSyCPPmlPfkv3U89LcDYIMstVbhT0ZN7MNPg',

    model: VideoModel, 

    addVideo: function(title, description, videoId, thumbnail) {
        this.create({
            title: title, 
            description: description, 
            videoId: videoId, 
            thumbnail: thumbnail
        }, {wait: true});
    }, 

    parse: function(response) {
        return response; 
    }
}); 