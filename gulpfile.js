var gulp = require('gulp'),
    RevAll = require('./lib/gulp-rev-all');

gulp.task('default', function() {

    var revAll = new RevAll({
        dontSearchFile: [/[.](zip|rar|xml|cfg|js|jsp|tpl)$/i],
        mainfestType: 'js|css',
        configFilePath: 'js/lib/seajs-config.js'
    });

    var revisioner = revAll.revisioner;

    gulp.src('build/src/**')
        .pipe(revAll.revision())
        .pipe(gulp.dest('build/dist'))
        .pipe(revAll.buildManifestFile())
        .pipe(gulp.dest('build/dist'));

});
