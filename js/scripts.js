
var callback = function (a, b, c) {
    console.log("Unity callback called: ", a, b, c);
}

var Module = {
    TOTAL_MEMORY: 268435456,
    errorhandler: callback,   // arguments: err, url, line. This function must return 'true' if the error is handled, otherwise 'false'
    compatibilitycheck: null,
    backgroundColor: "#80858B",
    splashStyle: "Dark",
    // dataUrl: "unity/Web_MonkeyKing.data",
    // codeUrl: "unity/Web_MonkeyKing.js",
    // asmUrl: "unity/Web_MonkeyKing.asm.js",
    // memUrl: "unity/Web_MonkeyKing.mem"
};

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
var imagesSlideshowTemplate = $('#images-slideshow-template').html();
Mustache.parse(imagesSlideshowTemplate);                          // optional, speeds up future uses
var unityCanvasTemplate = $('#unity-canvas-template').html();
Mustache.parse(unityCanvasTemplate);                          // optional, speeds up future uses
var unityImageTemplate = $('#unity-image-template').html();
Mustache.parse(unityImageTemplate);                          // optional, speeds up future uses


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

function renderImagesSlideshow(puppet) {
    puppet.images = puppet.images
        .map((img) => {
            a = {};
            a.location = img;
            a.isActive = false;
            return a;
        });
    puppet.images[0].isActive = true;
    // console.log("puppetImages", puppet.images);
    var imagesSlideshowRendered = Mustache.render(imagesSlideshowTemplate, puppet);
    $('#carousel-inner').html(imagesSlideshowRendered);
}

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
    if (puppet.unity) {
        var unityCanvasTemplateRendered = Mustache.render(unityCanvasTemplate, {});
        Module.dataUrl = puppet.unity.dataUrl;
        Module.codeUrl = puppet.unity.codeUrl;
        Module.asmUrl = puppet.unity.asmUrl;
        Module.memUrl = puppet.unity.memUrl;
        elementWrapper.html(unityCanvasTemplateRendered);
        console.log("DONE!");
        var scriptEl;
        loadScript('./js/UnityLoader.js', scriptEl, function () {
            console.log("Loaded");
        });
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
        prevAnchor.prop("href", "/puppet.html?puppetId=" + prevId + "&class=" + searchClass);
    } else {
        prevAnchor.hide();
    }
    if (nextId !== undefined) {
        nextAnchor.prop("href", "/puppet.html?puppetId=" + nextId + "&class=" + searchClass);
    } else {
        nextAnchor.hide();
    }
}

function render() {
    var searchClass = urlParam("class");
    var puppetId = urlParam("puppetId");
    $.get('data.json', function (puppets) {
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
        renderInfoTab(puppet);
        renderPageTitle(puppet);
        renderHeader();
        renderImagesSlideshow(puppet);
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