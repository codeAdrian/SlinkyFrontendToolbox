/*
 *  ______     _             _______          _ _    _ _
 * |  ____|   | |           |__   __|        | | |  (_) |
 * | |__   ___| |__   ___      | | ___   ___ | | | ___| |_
 * |  __| / __| '_ \ / _ \     | |/ _ \ / _ \| | |/ / | __|
 * | |___| (__| | | | (_) |    | | (_) | (_) | |   <| | |_
 * |______\___|_| |_|\___/     |_|\___/ \___/|_|_|\_\_|\__|  v 3.1.0
 *
 *                                  Echo Team Frontend Toolkit
 *                                  By: Adrian Bece
 *
 *                                      adrian.bece@inchoo.net
 *                                      @AdrianBDesigns
 */

/**
 * Gulp task runner requires
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var stripCssComments = require('gulp-strip-css-comments');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
 
/**
 * Input and Output folder setup
 */

 // CSS
var cssInput = '../scss/**/*.scss';
var cssOutput = '../../css/';

// Javascript
var jsSkinInput = '../js/**/*.js';
var jsSkinOutput = '../../js/';

// Images
var imageInput = '../images/**/*.{jpg,jpeg,gif,png,svg}';
var imageOutput = '../../images/';

/**
 * Minify Images
 */
gulp.task('minify-images', () =>
    gulp.src(imageInput)
        .pipe(imagemin()).pipe(rename({
            suffix: '-min'
        }))
        .pipe(gulp.dest(imageOutput))
);


/**
 * Minify Javascript
 */
gulp.task('minify-javascript', function() {
    return gulp.src(jsSkinInput)
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(jsSkinOutput));
});

/**
 * Compile, Autoprefix and Minify SASS/SCSS
 */
gulp.task('compile-sass', function () {
    return gulp.src(cssInput)
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'compressed'
        })).pipe(autoprefixer({
            cascade: false
        }))
        .pipe(stripCssComments())
        .pipe(gulp.dest(cssOutput))
});

/**
 * Watcher for SASS/CSS compile task
 */
gulp.task('watch-compile-sass', function() {
    return gulp
        .watch([cssInput, cssOutput],['compile-sass'])
        // When there is a change, log a message in the console
        .on('change', function(event) {
            console.log('SASS/SCSS file ' + event.path + ' was ' + event.type + '. Compiling SASS/SCSS...');
        })
});

/**
 * Watcher for Image minify task
 */
gulp.task('watch-minify-images', function() {
    return gulp
        .watch([imageInput, imageOutput],['minify-images'])
        // When there is a change, log a message in the console
        .on('change', function(event) {
            console.log('Image file ' + event.path + ' was ' + event.type + '. Minifying Images...');
        })
});

/**
 * Watcher for JS minify task
 */
gulp.task('watch-minify-javascript', function() {
    return gulp
    // Watch the js input folder for change
        .watch([jsSkinInput,jsSkinOutput], ['minify-javascript'])
        // log a message in the console
        .on('change', function(event) {
            console.log('Javascript file ' + event.path + ' was ' + event.type + '. Minifying Javascipt...');
        });
});

/**
 * Default task
 * Watcher: SASS/SCSS, Javascript, Images
 */
gulp.task('default', ['minify-javascript', 'watch-minify-javascript', 'compile-sass', 'watch-compile-sass', 'minify-images','watch-minify-images']);