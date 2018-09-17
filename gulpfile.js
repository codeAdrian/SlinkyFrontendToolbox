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

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({ lazy: true }),
    cssnano = require('cssnano'),
    atImport = require('postcss-easy-import'),
    lost = require('lost'),
    mixins = require('postcss-mixins'),
    postcssPresetEnv = require('postcss-preset-env');

var config = require('./gulp.config')();

/*------------------------------------------------------------*\
                 TASK - GENERATE FAVICONS
\*------------------------------------------------------------*/

gulp.task('generate-favicon', function () {
    return gulp
        .src(config.favicons.input)
        .pipe($.favicons(config.favicons.config))
        .on('error', handleError)
        .pipe(gulp.dest(config.favicons.output));
});

/*------------------------------------------------------------*\
                 TASK - MINIFY IMAGES
\*------------------------------------------------------------*/

gulp.task('minify-images', function () {
    return gulp
        .src(config.images.input)
        .pipe($.imagemin().on('error', handleError))
        .pipe($.rename(config.images.rename))
        .pipe(gulp.dest(config.images.output));
});

/*------------------------------------------------------------*\
                 TASK - GENERATE SPRITESHEET
\*------------------------------------------------------------*/

gulp.task('generate-spritesheet', function () {
    return gulp
        .src(config.sprites.input)
        .pipe($.svgSprites(config.sprites.config))
        .pipe(gulp.dest(config.sprites.output))
        .pipe($.filter(config.sprites.filter))
        .pipe($.svg2png())
        .pipe(gulp.dest(config.sprites.output));
});

/*------------------------------------------------------------*\
                    TASK - MOVE FONT FILES
\*------------------------------------------------------------*/

gulp.task('move-fonts', function () {
    return gulp.src(config.fonts.input).pipe(gulp.dest(config.fonts.output));
});

/*------------------------------------------------------------*\
                    TASK - JAVASCRIPT LINTER
\*------------------------------------------------------------*/

gulp.task('lint-javascript', function () {
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

gulp.task('minify-javascript', ['lint-javascript'], function () {
    return gulp
        .src(config.javascript.input)
        .pipe($.rename(config.javascript.rename))
        .pipe($.uglify().on('error', handleError))
        .pipe(gulp.dest(config.javascript.output));
});

/*------------------------------------------------------------*\
                   TASK - LINT CSS
\*------------------------------------------------------------*/

gulp.task('lint-css', function () {
    return gulp.src([config.css.inputAll, config.css.excludeVendor]).pipe(
        $.stylelint({
            reporters: [{ formatter: 'string', console: true }]
        })
    );
});

/*------------------------------------------------------------*\
            TASK - COMPILE CSS, MINIFY
\*------------------------------------------------------------*/

gulp.task('compile-css', ['lint-css'], function () {
    var plugins = [
        atImport(config.css.config.atImport),
        mixins,
        lost,
        postcssPresetEnv(config.css.config.postcssPresetEnv),
        cssnano(config.css.config.cssNano)
    ];
    return gulp
        .src(config.css.inputMain)
        .pipe($.postcss(plugins))
        .pipe(
            $.rename({
                extname: '.css'
            })
        )
        .pipe(gulp.dest(config.css.output));
});

/*------------------------------------------------------------*\
                 WATCHER - GENERATE SPRITESHEET
\*------------------------------------------------------------*/

gulp.task('watch-generate-spritesheet', function () {
    return gulp
        .watch([config.sprites.input], ['generate-spritesheet'])
        .on('change', function (event) {
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

gulp.task('watch-move-fonts', function () {
    return gulp
        .watch(config.fonts.input, ['move-fonts'])
        .on('change', function (event) {
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
            WATCHER - COMPILE CSS, MINIFY
\*------------------------------------------------------------*/

gulp.task('watch-compile-css', function () {
    return gulp
        .watch([config.css.inputAll], ['compile-css'])
        .on('change', function (event) {
            log(
                'PostCSS file ' +
                event.path +
                ' was ' +
                event.type +
                '. Compiling PostCSS..'
            );
        });
});

/*------------------------------------------------------------*\
                    WATCHER - IMAGE MINIFY
\*------------------------------------------------------------*/

gulp.task('watch-minify-images', function () {
    return gulp
        .watch([config.images.input], ['minify-images'])
        .on('change', function (event) {
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

gulp.task('watch-minify-javascript', function () {
    return gulp
        .watch([config.javascript.input], ['minify-javascript'])
        .on('change', function (event) {
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
    'compile-css',
    'minify-javascript',
    'watch-compile-css',
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

gulp.task('lint', ['lint-css', 'lint-javascript']);
