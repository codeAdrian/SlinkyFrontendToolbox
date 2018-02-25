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

/*------------------------------------------------------------*\
                    GULP SETUP & REQUIRES
\*------------------------------------------------------------*/

var gulp = require('gulp');
var map = require('map-stream');
var del = require('del');
var $ = require('gulp-load-plugins')({ lazy: true });

var config = require('./gulp.config')();

/*------------------------------------------------------------*\
                 TASK - GENERATE FAVICONS
\*------------------------------------------------------------*/

gulp.task('generate-favicon', function() {
    return gulp
        .src(config.favicons.input)
        .pipe($.favicons(config.favicons.config))
        .on('error', handleError)
        .pipe(gulp.dest(config.favicons.output));
});

/*------------------------------------------------------------*\
                 TASK - MINIFY IMAGES
\*------------------------------------------------------------*/

gulp.task('minify-images', function() {
    return gulp
        .src(config.images.input)
        .pipe($.imagemin().on('error', handleError))
        .pipe($.rename(config.images.rename))
        .pipe(gulp.dest(config.images.output));
});

/*------------------------------------------------------------*\
                 TASK - GENERATE SPRITESHEET
\*------------------------------------------------------------*/

gulp.task('generate-spritesheet', function() {
    return gulp
        .src(config.sprites.input)
        .pipe($.svgSprites(config.sprites.config))
        .pipe(gulp.dest(config.sprites.output))
        .pipe($.filter(config.sprites.filter))
        .pipe($.svg2png())
        .pipe(gulp.dest(config.sprites.output));
});

/*------------------------------------------------------------*\
                    TASK - CLEAN FONT FILES
\*------------------------------------------------------------*/

gulp.task('clean-fonts', function(done) {
    clean('./' + config.fonts.output + '**/*.*', done);
});

/*------------------------------------------------------------*\
                    TASK - MOVE FONT FILES
\*------------------------------------------------------------*/

gulp.task('move-fonts', ['clean-fonts'], function() {
    return gulp.src(config.fonts.input).pipe(gulp.dest(config.fonts.output));
});

/*------------------------------------------------------------*\
                    TASK - JAVASCRIPT LINTER
\*------------------------------------------------------------*/

gulp.task('lint-javascript', function() {
    return gulp
        .src([config.javascript.input, config.javascript.exclude])
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
        .pipe($.jshint.reporter('fail').on('error', handleError));
});

/*------------------------------------------------------------*\
                    TASK - MINIFY JAVASCRIPT
\*------------------------------------------------------------*/

gulp.task('minify-javascript', ['lint-javascript'], function() {
    return gulp
        .src(config.javascript.input)
        .pipe($.rename(config.javascript.rename))
        .pipe($.uglify().on('error', handleError))
        .pipe(gulp.dest(config.javascript.output));
});

/*------------------------------------------------------------*\
                   TASK - LINT SASS / SCSS
\*------------------------------------------------------------*/

gulp.task('lint-sass', function() {
    return gulp
        .src(config.css.input)
        .pipe($.sassLint(config.scssLintConfig))
        .pipe($.sassLint.format())
        .pipe($.sassLint.failOnError());
});

/*------------------------------------------------------------*\
            TASK - COMPILE SASS, AUTOPREFIX, MINIFY
\*------------------------------------------------------------*/

gulp.task('compile-sass', ['lint-sass'], function() {
    return gulp
        .src(config.css.input)
        .pipe($.sourcemaps.init())
        .pipe($.sass(config.css.sass).on('error', $.sass.logError))
        .pipe($.autoprefixer(config.css.autoprefixer))
        .pipe($.stripCssComments())
        .pipe(gulp.dest(config.css.output));
});

/*------------------------------------------------------------*\
                TASK - CLEAN OUTPUT FOLDERS
\*------------------------------------------------------------*/
gulp.task('clean-output', ['lint-sass'], function(done) {
    clean('./' + config.fonts.output + '**/*.*', done);
    clean('./' + config.css.output + '**/*.*', done);
    clean('./' + config.javascript.output + '**/*.*', done);
    clean('./' + config.images.output + '**/*.*', done);
});

/*------------------------------------------------------------*\
                 WATCHER - GENERATE SPRITESHEET
\*------------------------------------------------------------*/

gulp.task('watch-generate-spritesheet', function() {
    return gulp
        .watch([config.sprites.input], ['generate-spritesheet'])
        .on('change', function(event) {
            log(
                'Spritesheet file: ' +
                    event.path +
                    ' was ' +
                    event.type +
                    '. Generating spritesheet...'
            );
        });
});

/*------------------------------------------------------------*\
                 WATCHER - MOVE FONT FILES
\*------------------------------------------------------------*/

gulp.task('watch-move-fonts', function() {
    return gulp
        .watch(config.fonts.input, ['move-fonts'])
        .on('change', function(event) {
            log(
                'Font file ' +
                    event.path +
                    ' was ' +
                    event.type +
                    '. Moving fonts...'
            );
        });
});

/*------------------------------------------------------------*\
            WATCHER - COMPILE SASS, AUTOPREFIX, MINIFY
\*------------------------------------------------------------*/

gulp.task('watch-compile-sass', function() {
    return gulp
        .watch([config.css.input], ['compile-sass'])
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

/*------------------------------------------------------------*\
                    WATCHER - IMAGE MINIFY
\*------------------------------------------------------------*/

gulp.task('watch-minify-images', function() {
    return gulp
        .watch([config.images.input], ['minify-images'])
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

/*------------------------------------------------------------*\
                WATCHER - JAVASCRIPT MINIFICATION
\*------------------------------------------------------------*/

gulp.task('watch-minify-javascript', function() {
    return gulp
        .watch([config.javascript.input], ['minify-javascript'])
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

/*------------------------------------------------------------*\
                      CUSTOM FUNCTIONS
\*------------------------------------------------------------*/

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

function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path, done);
}

function handleError(e) {
    log(config.gulp.consoleDivider);
    log('Warning: Code is not valid');
    if (e.file) {
        log('File: ' + e.file);
    } else if (e.message) {
        log(e.message);
    }
    log('Please check terminal for info on warnings and errors ');
    log(config.gulp.consoleDivider);
    this.emit('end');
}

/*------------------------------------------------------------*\
                      GULP TASK RUNNERS
\*------------------------------------------------------------*/

gulp.task('default', [
    'compile-sass',
    'minify-javascript',
    'watch-compile-sass',
    'watch-minify-javascript'
]);

gulp.task('deploy-assets', [
    'minify-images',
    'generate-favicon',
    'generate-spritesheet',
    'move-fonts'
]);

gulp.task('watch-assets', [
    'watch-minify-images',
    'generate-favicon',
    'watch-generate-spritesheet',
    'watch-move-fonts'
]);

gulp.task('lint', ['lint-sass', 'lint-javascript']);
