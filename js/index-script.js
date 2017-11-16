var template = $('#search-results-template').html();
Mustache.parse(template);   // optional, speeds up future uses

function urlParam(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results ? results[1] : "";
};

function renderHeader() {
    // $("#header-wrapper").load("header.html");
    var searchClass = urlParam("srch-class");
    searchClass = searchClass ? searchClass : "ASIAN";
    var element = $(document.getElementById(searchClass));
    console.log("el:", element);
    element.addClass("selected");
}

function render() {
    var searchKey = urlParam("srch-term");
    var searchClass = urlParam("srch-class");
    if (!searchKey && !searchClass) {
        searchClass = "ASIAN";
    }
    $.get('data.json', function (puppets) {
        puppets = JSON.parse(puppets);
        puppets = $.map(puppets, (el, index) => {
            el.index = index;
            return el;
        });
        if (searchKey) {
            puppets = puppets.filter((el) => {
                caseInsensitiveName = el.name.toLowerCase();
                searchKey = searchKey.toLowerCase();
                return caseInsensitiveName.indexOf(searchKey) >= 0;
            });
        }

        if (searchClass) {
            console.log("searchClass: ", searchClass);
            puppets = puppets.filter((el) => {
                caseInsensitiveCollection = el.collection.toUpperCase();
                searchClass = searchClass.toUpperCase();
                return caseInsensitiveCollection.indexOf(searchClass) >= 0;
            });
        }
        var data = { "puppets": puppets };
        console.log(searchKey, data);
        var rendered = Mustache.render(template, data);
        if (puppets.length > 0) {
            $('#search-results').html(rendered);
        }

        renderHeader();
    });
};
