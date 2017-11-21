
var callback = function (a, b, c) {
    console.log("Unity callback called: ", a, b, c);
}

// var Module = {
//     TOTAL_MEMORY: 268435456,
//     errorhandler: callback,   // arguments: err, url, line. This function must return 'true' if the error is handled, otherwise 'false'
//     compatibilitycheck: null,
//     backgroundColor: "#80858B",
//     splashStyle: "Dark",
//     // dataUrl: "unity/Web_MonkeyKing.data",
//     // codeUrl: "unity/Web_MonkeyKing.js",
//     // asmUrl: "unity/Web_MonkeyKing.asm.js",
//     // memUrl: "unity/Web_MonkeyKing.mem"
// };

function urlParam(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results ? results[1] : 0;
};



var imagesTabTemplate = $('#images-template').html();
Mustache.parse(imagesTabTemplate);                          // optional, speeds up future uses

var infoTabTemplate = $('#info-template').html();
Mustache.parse(infoTabTemplate);                            // optional, speeds up future uses

var pageTitleTemplate = $('#page-title-template').html();
Mustache.parse(pageTitleTemplate);                          // optional, speeds up future uses

var imageLargeViewTemplate = $("#image-large-view-template").html();
Mustache.parse(imageLargeViewTemplate);                          // optional, speeds up future uses

var imagesSlideshowTemplate = $('#images-slideshow-template').html();
Mustache.parse(imagesSlideshowTemplate);                          // optional, speeds up future uses

var unityCanvasTemplate = $('#unity-canvas-template').html();
Mustache.parse(unityCanvasTemplate);                          // optional, speeds up future uses

var unityImageTemplate = $('#unity-image-template').html();
Mustache.parse(unityImageTemplate);                          // optional, speeds up future uses

var youtubeVideoGalleryTemplate = $("#youtube-video-gallery-template").html();
Mustache.parse(youtubeVideoGalleryTemplate);

var youtubeVideoPlayerTemplate = $("#youtube-video-player-template").html();
Mustache.parse(youtubeVideoPlayerTemplate);

function renderHeader() {
    // $("#header-wrapper").load("header.html");
    var searchClass = urlParam("class");
    searchClass = searchClass ? searchClass : "ASIAN";
    var element = $(document.getElementById(searchClass));
    // console.log("el:", element);
    element.addClass("selected");
}

function renderImagesTab(puppet) {
    var imagesTabRendered = Mustache.render(imagesTabTemplate, puppet);
    $('#images').html(imagesTabRendered);
};

function renderInfoTab(puppet) {
    var infoTabRendered = Mustache.render(infoTabTemplate, puppet);
    $('#info').html(infoTabRendered);
};

function renderPageTitle(puppet) {
    var pageTitleRendered = Mustache.render(pageTitleTemplate, puppet);
    $('#page-title').html(pageTitleRendered);
    $('.modal-title').html(pageTitleRendered);
};

function loadScript(src, script, callback) {

    script = document.createElement('script');
    script.onerror = function (e) {
        // handling error when loading script
        console.error('Error occurred', e);
    }
    script.onload = function () {
        console.log(src + ' loaded ')
        callback();
    }
    script.src = src;
    document.getElementsByTagName('head')[0].appendChild(script);
}

function renderUnityElement(puppet) {
    var elementWrapper = $('#unity-element-wrapper');
    if (puppet.unityDataFile) {
        // var  scriptEl = {};
        // loadScript('./js/UnityLoader.js', scriptEl, function () {

        UnityLoader.instantiate("unity-element", puppet.unityDataFile);
        // unityElHeight = elementWrapper.height();
        // unityElWidth = elementWrapper.width();
        // var unityCanvasTemplateRendered = Mustache.render(unityCanvasTemplate, {width:unityElWidth, height:unityElHeight});
        // Module.dataUrl = puppet.unity.dataUrl;
        // Module.codeUrl = puppet.unity.codeUrl;
        // Module.asmUrl = puppet.unity.asmUrl;
        // Module.memUrl = puppet.unity.memUrl;
        // console.log("unityCanvasTemplateRendered: ", unityCanvasTemplateRendered);
        // unityCanvasTemplateRendered.attr("height", 300);
        // elementWrapper.html(unityCanvasTemplateRendered);
        
        console.log("DONE!");
        // var scriptEl;
        //     console.log("Loaded");
        // });
    } else {
        delete Module;
        console.info("No unity info found found for puppet. Rendering title image");
        var unityImageTemplateRendered = Mustache.render(unityImageTemplate, puppet);
        elementWrapper.html(unityImageTemplateRendered);
    }
}

function updateAnchorHref(prevId, nextId) {
    var searchClass = urlParam("class");
    var puppetId = urlParam("puppetId");
    var prevAnchor = $('#prev-anchor');
    var nextAnchor = $('#next-anchor');
    if (prevId !== undefined) {
        prevAnchor.prop("href", "puppet.html?puppetId=" + prevId + "&class=" + searchClass);
    } else {
        prevAnchor.hide();
    }
    if (nextId !== undefined) {
        nextAnchor.prop("href", "puppet.html?puppetId=" + nextId + "&class=" + searchClass);
    } else {
        nextAnchor.hide();
    }
}

function renderLargeImageView(){
    $(".image-gallery-image-wrapper").click(function (){
        var imageUrl = $(this).attr('data-imageUrl');
        console.log("imageUrl: ", imageUrl);
        imageLargeViewRendered = Mustache.render(imageLargeViewTemplate, {imageUrl:imageUrl});
        $("#largeImage").html(imageLargeViewRendered);
    });
}

function renderYoutubePlayer() {

    $(".video-gallery-image-wrapper").click(function (){
        var videoId = $(this).attr('data-videoId');
        console.log("videoId: ", videoId);

        $("#yt-modal").on('show.bs.modal', function (){
            puppetVideoUrl = "https://www.youtube.com/embed/"+videoId+"?autoplay=0";
            ytIframeRendered = Mustache.render(youtubeVideoPlayerTemplate, {puppetVideoUrl:puppetVideoUrl});
            $("#yt-player").html(ytIframeRendered);
        });
   });

   $("#yt-modal").on('hidden.bs.modal', function (){
        $("#yt-player").html('');
    });

}

function renderVideosGallery(puppet){
    // https://img.youtube.com/vi/v15g9WxZxXg/sddefault.jpg
    console.log("puppet.youTubeVideoIds: ", puppet.youTubeVideoIds);
    if (puppet.youTubeVideoIds && puppet.youTubeVideoIds.length && puppet.youTubeVideoIds.length > 0){
        puppetVideo = puppet.youTubeVideoIds.map( videoId => { return {
            "thumbnailUrl": "https://img.youtube.com/vi/" + videoId + "/sddefault.jpg",
            "videoId": videoId
        };});
        var youtubeVideoGalleryRendered = Mustache.render(youtubeVideoGalleryTemplate, {puppetVideo :puppetVideo});
        $('#videos').html(youtubeVideoGalleryRendered);
    }
}

function render() {
    var searchClass = urlParam("class");
    var puppetId = urlParam("puppetId");
    $.get('./data.json', function (puppets) {
        if (!(typeof puppets === 'object')){
            console.log("puppets: ", puppets);
            puppets = JSON.parse(puppets);
        }
        puppets = $.map(puppets, (el, index) => {
            el.index = index;
            return el;
        });
        searchClass = searchClass ? searchClass : "ASIAN";
        puppets = puppets.filter((el) => {
            caseInsensitiveCollection = el.collection.toUpperCase();
            searchClass = searchClass.toUpperCase();
            return caseInsensitiveCollection.indexOf(searchClass) >= 0;
        });
        var puppet = puppets.find((puppet) => (puppet.index == puppetId));
        console.log("Selected puppet:", puppet);
        renderImagesTab(puppet);
        renderLargeImageView();
        renderInfoTab(puppet);
        renderPageTitle(puppet);
        renderHeader();
        renderVideosGallery(puppet);
        renderYoutubePlayer();
        // if (puppet.youTubeVideoIds) {
        //     renderYoutubePlayer(puppet.youTubeVideoIds[0]);
        // }
        // console.log("[TANMAY] puppetsFiltered: ", puppets);
        var prevId = undefined, nextId = undefined;
        for (i = 0; i < puppets.length; i++) {
            if (puppets[i + 1] && puppets[i + 1].index == puppetId) {
                prevId = puppets[i].index;
            }
            if (puppets[i - 1] && puppets[i - 1].index == puppetId) {
                nextId = puppets[i].index;
            }
        }
        // console.log("[TANMAY] prevId: ", prevId, "nextId", nextId);
        updateAnchorHref(prevId, nextId);
        renderUnityElement(puppet);
    });
};