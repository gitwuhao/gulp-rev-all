var Through = require('through2');
var Revisioner = require('./revisioner');

var RevAll = (function() {
    var index = 0;
    var RevAll = function(options) {

        this.revisioner = new Revisioner(options);

    };

    RevAll.prototype.revision = function() {

        var revisioner = this.revisioner;

        // Feed the RevAll Revisioner with all the files in the stream, don't emit them until all of them have been processed
        return Through.obj(function(file, enc, callback) {

            if (file.isStream()) {
                throw new Error('Streams are not supported!');
            }
            if (file.isBuffer()) {
                console.info('INFO[' + (++index) + ']> revision:' + file.path);
                revisioner.processFile(file);
            }

            callback();

        }, function(callback) {

            console.info('INFO[' + (++index) + ']> push revision;');

            revisioner.run();

            var files = revisioner.files;
            for (var filename in files) {
                this.push(files[filename]);
            }
            callback();

        });

    };

    RevAll.prototype.versionFile = function() {

        var revisioner = this.revisioner;

        // Drop any existing files off the stream, push the generated version file
        return Through.obj(function(file, enc, callback) {
            console.info('INFO[' + (++index) + ']> versionFile:' + file.path);
            // Drop any existing files off the stream
            callback();

        }, function(callback) {

            console.info('INFO[' + (++index) + ']> push versionFile;');

            this.push(revisioner.versionFile());
            callback();

        });

    };

    RevAll.prototype.manifestFile = function() {

        var revisioner = this.revisioner;

        // Drop any existing files off the stream, push the generated manifest file
        return Through.obj(function(file, enc, callback) {

            console.info('INFO[' + (++index) + ']> manifestFile:' + file.path);
            callback();

        }, function(callback) {
            console.info('INFO[' + (++index) + ']> push manifestFile;');
            this.push(revisioner.manifestFile());
            callback();

        });
    };



    RevAll.prototype.buildManifestFile = function(type, configFilePath) {

        var revisioner = this.revisioner;

        // Drop any existing files off the stream, push the generated manifest file
        return Through.obj(function(file, enc, callback) {
            callback();
        }, function(callback) {
            this.push(revisioner.buildManifestFile(type, configFilePath));
            callback();

        });
    };

    return RevAll;

})();

module.exports = RevAll;
