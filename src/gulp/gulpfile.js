/*
 * ███████╗██╗     ██╗███╗   ██╗██╗  ██╗██╗   ██╗
 * ██╔════╝██║     ██║████╗  ██║██║ ██╔╝╚██╗ ██╔╝
 * ███████╗██║     ██║██╔██╗ ██║█████╔╝  ╚████╔╝ 
 * ╚════██║██║     ██║██║╚██╗██║██╔═██╗   ╚██╔╝  
 * ███████║███████╗██║██║ ╚████║██║  ██╗   ██║   
 * ╚══════╝╚══════╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝   ╚═╝  
 *
 * Frontend Toolbox       Created By: Adrian Bece
 * 
 *                        adrian.bece@inchoo.net
 *                        @AdrianBDesigns
 */

/**
 * Gulp task runner requires
 */
var gulp = require('gulp');
var map = require('map-stream');
var $ = require('gulp-load-plugins')({ lazy: true });

var config = require('./gulp.config')();

/**
 * Minify Images
 */
gulp.task('minify-images', function() {
    return gulp
        .src(config.imageInput)
        .pipe($.imagemin().on('error', handleError))
        .pipe($.rename(config.imgRename))
        .pipe(gulp.dest(config.imageOutput));
});

/**
 * Minify Javascript
 */
gulp.task('minify-javascript', function() {
    return gulp
        .src(config.jsSkinInput)
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe(
            $.jshint
                .reporter('jshint-stylish', { verbose: true })
                .on('error', handleError)
        )
        .pipe($.jshint.reporter('fail').on('error', handleError))
        .pipe($.rename(config.jsRename))
        .pipe($.uglify().on('error', handleError))
        .pipe(gulp.dest(config.jsSkinOutput));
});

/**
 * Compile, Autoprefix and Minify SASS/SCSS
 */
gulp.task('compile-sass', function() {
    return gulp
        .src(config.cssInput)
        .pipe($.sassLint(config.scssLintConfig))
        .pipe($.sassLint.format())
        .pipe($.sassLint.failOnError().on('error', handleError))
        .pipe($.sourcemaps.init())
        .pipe($.sass(config.sass).on('error', handleError))
        .pipe($.autoprefixer(config.autoprefixer))
        .pipe($.stripCssComments())
        .pipe(gulp.dest(config.cssOutput));
});

/**
 * Watcher for SASS/CSS compile task
 */
gulp.task('watch-compile-sass', function() {
    return gulp
        .watch([config.cssInput, config.cssOutput], ['compile-sass'])
        .on('change', function(event) {
            log(
                'SASS/SCSS file ' +
                    event.path +
                    ' was ' +
                    event.type +
                    '. Compiling SASS/SCSS...'
            );
        });
});

/**
 * Watcher for Image minify task
 */
gulp.task('watch-minify-images', function() {
    return gulp
        .watch([config.imageInput, config.imageOutput], ['minify-images'])
        .on('change', function(event) {
            log(
                'Image file ' +
                    event.path +
                    ' was ' +
                    event.type +
                    '. Minifying Images...'
            );
        });
});

/**
 * Watcher for JS minify task
 */
gulp.task('watch-minify-javascript', function() {
    return gulp
        .watch([config.jsSkinInput, config.jsSkinOutput], ['minify-javascript'])
        .on('change', function(event) {
            log(
                'Javascript file ' +
                    event.path +
                    ' was ' +
                    event.type +
                    '. Minifying Javascipt...'
            );
        });
});

/**
 * Custom Functions
 */
function log(msg) {
    if (typeof msg === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}

function handleError(e) {
    log(config.consoleDivider);
    log('Warning: Code is not valid');
    log('File: ' + e.file);
    log('Please check terminal for info on warnings and errors ');
    log(config.consoleDivider);
    this.emit('end');
}

/**
 * Default task
 * Watcher: SASS/SCSS, Javascript, Images
 */
gulp.task('default', [
    'compile-sass',
    'minify-javascript',
    'minify-images',
    'watch-compile-sass',
    'watch-minify-javascript',
    'watch-minify-images'
]);
