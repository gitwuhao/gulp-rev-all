(function(seajs) {
    'use strict';
    var ROOT_PATH = window.ROOT_PATH || './js/',
        LIB_PATH = ROOT_PATH + 'lib';
    seajs.config({
        base: ROOT_PATH,
        debug: true,
        alias: {
            'seajs.css': LIB_PATH + '/seajs-css-debug.js',
            'seajs.queue': LIB_PATH + '/MyJS/seajs.queue.js',
            'jquery': LIB_PATH + '/jquery/jquery-2.1.1.js',
            "qunit": LIB_PATH + "/qunit/qunit-1.18.0.js",
            'handlebars': LIB_PATH + '/handlebars/handlebars-v3.0.3.js',
            'class': LIB_PATH + '/MyJS/class/src/class.js',
            'class.event': LIB_PATH + '/MyJS/class/src/class.event.js',
            'class.log': LIB_PATH + '/MyJS/class/src/class.log.js',
            'color': LIB_PATH + '/MyJS/color.js',
            'util': LIB_PATH + '/MyJS/util.js',
            'prototype': LIB_PATH + '/MyJS/prototype.ext.js',
            'jquery.ext': LIB_PATH + '/MyJS/jquery.ext.js'
        },
        paths: {
            '%root%': ROOT_PATH,
            '%lib%': LIB_PATH,
            '%myjs%': LIB_PATH + '/MyJS',
            '%.%': '.'
        }
    });


    seajs.on('save', function(data) {
        var alias = seajs.data.alias;

        //console.info('on save:',data);
    });

    var manifest = {
  "/css/main.css": "14337348",
  "/js/draw.js": "14333910",
  "/js/startup.js": "14328630",
  "/js/test.js": "14334849",
  "/js/lib/sea-debug.js": "14198337",
  "/js/lib/seajs-config.js": "14337435",
  "/js/lib/seajs-css-debug.js": "14082505",
  "/js/test/touch.js": "14333838",
  "/js/lib/MyJS/HttpRequest.js": "14328679",
  "/js/lib/MyJS/color.js": "14333908",
  "/js/lib/MyJS/jquery.ext.js": "14328082",
  "/js/lib/MyJS/prototype.ext.js": "14328075",
  "/js/lib/MyJS/seajs.queue.js": "14328862",
  "/js/lib/MyJS/util.js": "14328910",
  "/js/lib/jquery/jquery-2.1.1.js": "14295874",
  "/js/lib/MyJS/class/src/class.event.js": "14327949",
  "/js/lib/MyJS/class/src/class.js": "14327949",
  "/js/lib/MyJS/class/src/class.log.js": "14327949",
  "/js/lib/MyJS/class/example/js/example.js": "14327935",
  "__isQuery__": "1"
};

    seajs.on('request', function(data) {
        var uri = data.requestUri;
        for (var key in manifest) {
            var value = manifest[key];
            if (uri.indexOf(key) > -1) {
                if (manifest.__isQuery__) {
                    uri = getURIByQuery(uri, value);
                } else {
                    uri = getURIByFileName(uri, value);
                }
                delete manifest[key];
            }
        }
        data.requestUri = uri;
    });

    function getURIByFileName(uri, versionCode) {
        return uri.replace(/([.](js|css))([?]|$)/ig, '.' + versionCode + '$1');
    };

    function getURIByQuery(uri, versionCode) {
        var uriArray = uri.split('?'),
            locaHashArray,
            argArray;
        locaHashArray = (uriArray[1] || '').split('#');
        argArray = (locaHashArray[1] || locaHashArray[0]).split('&');


        versionCode='t'+versionCode+'=1';
        
        if (argArray[0] == '') {
            argArray[0] = versionCode;
        } else {
            argArray.push(versionCode);
        }
        return uriArray[0] + '?' + argArray.join('&');
    };

    seajs.on('fetch', function(data) {
        //console.info('on fetch:',data);
    });

    seajs.on('exec', function(data) {
        //console.info('on exec:',data);
    });

})(seajs);
