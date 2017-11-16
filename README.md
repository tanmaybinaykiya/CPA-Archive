# Center for Puppetry Arts: Puppet Archive

## Deployment

Can be run locally using any web server of your choice. A simple way is to run the following command in the project directory.
```sh
$ python -m SimpleHTTPServer
```
The web app can now be viewed in any modern browser at [http://localhost:8000](http://localhost:8000)

## Data updates

The website is made dynamic through the use of a json file(data.json). The json file corresponds to a json array of puppets in the archive.

To add/modify any data, the said json file needs to be updated.

### To add a puppet
Simply replace the following blob with the appropriate contents and add it to data.json.

* The collection field allows only the given values(AFRICAN | AMERICAS | ASIAN | EUROPEAN | MIDEAST)
* The info section is scalable as long as the key/value format is followed.
* The unity section provides links to the appropriate unity files
* If the unity section is not found in the object, the title image is displayed in place of the unity element.
* imageTitle refers to the URL of the image displayed on the search page and in the case that unity files are not available

```json
{
    "name":"Puppet Name",
    "description":"Puppet Description goes here",
    "collection":"AFRICAN | AMERICAS | ASIAN | EUROPEAN | MIDEAST",
    "images":["./path/to/image.jpg", "./path/to/another/image.jpg"],
    "imageTitle":"./path/to/title/image.jpg",
    "info":[
        { "key":"Accession Number",      "value":"someValue"}, 
        { "key":"Collector",             "value":"someValue"}, 
        { "key":"Artist",                "value":"someValue"}, 
        { "key":"Category",              "value":"someValue"}, 
        { "key":"Subcategory Othername", "value":"someValue"}, 
        { "key":"Received as",           "value":"someValue"}, 
        { "key":"Accession date",        "value":"someValue"}, 
        { "key":"Cataloged by",          "value":"someValue"}, 
        { "key":"Catalog date",          "value":"someValue"}, 
        { "key":"Source",                "value":"someValue"}, 
        { "key":"Credit Line",           "value":"someValue"}, 
        { "key":"Home loc",              "value":"someValue"}, 
        { "key":"Year Range",            "value":"someValue"}, 
        { "key":"Height",                "value":"someValue"},
        { "key":"Width",                 "value":"someValue"},
        { "key":"Depth",                 "value":"someValue"},
        { "key":"Material",              "value":"someValue"},
        { "key":"Condition",             "value":"someValue"},
        { "key":"Condition by",          "value":"someValue"},
        { "key":"Condition Date",        "value":"someValue"},
        { "key":"Condition Notes",       "value":"someValue"},
        { "key":"Current Value Min",     "value":"someValue"},
        { "key":"Current Value Min",     "value":"someValue"}
    ],
    "unity":{
        "dataUrl": "unity/file.data",
        "codeUrl": "unity/file.js",
        "asmUrl": "unity/file.asm.js",
        "memUrl": "unity/file.mem"
    }
}
```

## Development

### Libraries Used
* Bootstrap: UI elements
* MustacheJS: JSON based Templating  
* UnityJS: 3d - Unity elements


### Code structure

* index.html: Renders the search page
* puppet.html: Renders the puppet's information page.
* js/: Hosts all the javascript files
    * index-scripts.js: Contains the script to render the index.html page
    * puppet-scripts.js: Contains the script to render the puppet.html page
    * UnityLoader.js: Contains the script to render the unity elements on the puppet.html page [Maintainer: Pierce McBride]
* css/: Hosts all stylesheets
    * fonts/: hosts fonts used for icons
* img/: Hosts all images required for the app

> Developed by: [Tanmay Binaykiya](mailto:btanmay@gatech.edu)
