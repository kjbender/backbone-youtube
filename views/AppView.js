var AppView = Backbone.View.extend({

    el: $('body'),
  
    events: {
      'click .search-videos': 'searchVideos'
      //'click .video': 'changeMainVideo'
    },

    initialize: function () {
        this.$searchInput = this.$('#search-input');
        this.$videoList = this.$('.video-list');
        this.$videoMain = this.$('.video-main');

        this.listenTo(this.model.get('videos'), 'add', this.renderListVideo);
        this.listenTo(this.model.get('videos'), 'reset', this.renderPage);
        this.listenTo(this.model.get('videos'), 'reset', this.renderListVideos);
        this.listenTo(this.model, 'change:current_URL', this.renderListVideos);
        this.listenTo(this.model.get('videos'), 'reset', this.renderMainVideo);
        //this.listView = null;
        this.renderListVideos; 
    }, 

    renderPage: function () {
        console.log("render page"); 
    }, 

    searchVideos: function () {
        var query = this.$searchInput.val(); 
        console.log(query);
        this.model.setSearchUrl(query); 
        this.model.get('videos').fetch({reset:true}); 
        this.$searchInput.val(''); 

        // this.model.get('videos').addVideo(
        //     'cat video',
        //     'cute cats playing',
        //     'hY7m5jjJ9mM',
        //     'https://i.ytimg.com/vi/hY7m5jjJ9mM/default.jpg'
        // );

    },

    renderMainVideo: function () {
        console.log("render main video (AV)");
        var mainModel = this.model.get('videos').at(0); 
        var mainVideoView = new MainVideoView({model: mainModel});
        this.$videoMain.html(mainVideoView.render().el); 
    }, 

    renderListVideo: function (video) {
        console.log("render list video");
        var listVideoView = new ListVideoView({model: video});
        this.$videoList.append(listVideoView.render().el); 
    }, 

    renderListVideos: function () {
        this.$videoList.html(''); 
        console.log("render list videos");
        this.model.get('videos').each(function (m) {
            this.renderListVideo(m);
          }, this);
    }
});