/*
 *     ▄████████  ▄█        ▄█  ███▄▄▄▄      ▄█   ▄█▄ ▄██   ▄
 *    ███    ███ ███       ███  ███▀▀▀██▄   ███ ▄███▀ ███   ██▄
 *    ███    █▀  ███       ███▌ ███   ███   ███▐██▀   ███▄▄▄███
 *    ███        ███       ███▌ ███   ███  ▄█████▀    ▀▀▀▀▀▀███
 *  ▀███████████ ███       ███▌ ███   ███ ▀▀█████▄    ▄██   ███
 *           ███ ███       ███  ███   ███   ███▐██▄   ███   ███
 *     ▄█    ███ ███▌    ▄ ███  ███   ███   ███ ▀███▄ ███   ███
 *   ▄████████▀  █████▄▄██ █▀    ▀█   █▀    ███   ▀█▀  ▀█████▀
 *
 *        Frontend Toolbox       Created By: Adrian Bece
 *
 *                               adrianbece.code@gmail.com
 *                               codeadrian.github.io
 *                               @AdrianBDesigns
 */

/*------------------------------------------------------------*\
                    GULP SETUP & REQUIRES
\*------------------------------------------------------------*/

var gulp = require("gulp"),
    $ = require("gulp-load-plugins")({ lazy: true }),
    cssnano = require("cssnano"),
    mqpacker = require("css-mqpacker");
(atImport = require("postcss-easy-import")),
    (lost = require("lost")),
    (mixins = require("postcss-mixins")),
    (postcssPresetEnv = require("postcss-preset-env"));
autoprefixer = require("autoprefixer");

var config = require("./gulpconfig")();

/*------------------------------------------------------------*\
                      CUSTOM FUNCTIONS
\*------------------------------------------------------------*/

var welcome = function() {
    return new Promise(function(resolve, reject) {
        log(
            "\n\n    Thank you for using \n\n" +
                "     ▄████████  ▄█        ▄█  ███▄▄▄▄      ▄█   ▄█▄ ▄██   ▄  \n" +
                "    ███    ███ ███       ███  ███▀▀▀██▄   ███ ▄███▀ ███   ██▄\n" +
                "    ███    █▀  ███       ███▌ ███   ███   ███▐██▀   ███▄▄▄███\n" +
                "    ███        ███       ███▌ ███   ███  ▄█████▀    ▀▀▀▀▀▀███\n" +
                "  ▀███████████ ███       ███▌ ███   ███ ▀▀█████▄    ▄██   ███\n" +
                "           ███ ███       ███  ███   ███   ███▐██▄   ███   ███\n" +
                "     ▄█    ███ ███▌    ▄ ███  ███   ███   ███ ▀███▄ ███   ███\n" +
                "   ▄████████▀  █████▄▄██ █▀    ▀█   █▀    ███   ▀█▀  ▀█████▀ \n" +
                "\n    Created by: Adrian Bece (https://codeAdrian.github.io)" +
                "\n"
        );
        resolve();
    });
};

gulp.task("slinky:welcome", welcome);

process.on("unhandledRejection", error => {
    throw error;
});

function log(msg) {
    if (typeof msg === "object") {
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
    log("Warning: Code is not valid");
    if (e.file) {
        log("File: " + e.file);
    } else if (e.message) {
        log(e.message);
    }
    log("Please check terminal for info on warnings and errors ");
    log(config.gulp.consoleDivider);
    this.emit("end");
}

function fileLogger(file) {
    log("Change Detected in " + file);
}

/*------------------------------------------------------------*\
                      		CSS TASKS
\*------------------------------------------------------------*/

/* SHARED */

var cssLint = function() {
    return gulp.src([config.css.inputAll, config.css.excludeVendor]).pipe(
        $.stylelint({
            reporters: [{ formatter: "string", console: true }]
        })
    );
};

cssLint.displayName = "CSS Linter";

gulp.task("css:lint", cssLint);

/* PRODUCTION */

var cssCompileProd = function() {
    var plugins = [
        atImport(config.css.config.atImport),
        mixins,
        postcssPresetEnv(config.css.config.postcssPresetEnv),
        lost,
        autoprefixer(config.browsers),
        mqpacker(),
        cssnano(config.css.config.cssNano)
    ];
    return gulp
        .src(config.css.inputMain)
        .pipe($.postcss(plugins))
        .pipe(
            $.rename({
                extname: ".css"
            })
        )
        .pipe(gulp.dest(config.css.output));
};

cssCompileProd.displayName = "CSS Compiler (Production)";

gulp.task(
    "css:compile:production",
    gulp.series(gulp.parallel("css:lint"), cssCompileProd)
);

var cssWatchProd = function() {
    return gulp
        .watch([config.css.inputAll], gulp.series("css:compile:production"))
        .on("change", fileLogger);
};

cssWatchProd.displayName = "CSS Watcher (Production)";

gulp.task(
    "css:watch:production",
    gulp.series(gulp.parallel("css:compile:production"), cssWatchProd)
);

/* DEVELOPMENT */

var cssCompileDev = function() {
    var plugins = [
        atImport(config.css.config.atImport),
        mixins,
        postcssPresetEnv(config.css.config.postcssPresetEnv),
        lost,
        autoprefixer(config.browsers),
        mqpacker()
    ];
    return gulp
        .src(config.css.inputMain)
        .pipe($.sourcemaps.init())
        .pipe($.sourcemaps.identityMap())
        .pipe($.postcss(plugins))
        .pipe(
            $.rename({
                extname: ".css"
            })
        )
        .pipe($.sourcemaps.write(config.sourcemaps.folder))
        .pipe(gulp.dest(config.css.output));
};

cssCompileDev.displayName = "CSS Compiler (Dev)";

gulp.task(
    "css:compile:dev",
    gulp.series(gulp.parallel("css:lint"), cssCompileDev)
);

var cssWatchDev = function() {
    return gulp
        .watch([config.css.inputAll], gulp.series("css:compile:dev"))
        .on("change", fileLogger);
};

cssWatchProd.displayName = "CSS Watcher (Dev)";

gulp.task(
    "css:watch:dev",
    gulp.series(gulp.parallel("css:compile:dev"), cssWatchDev)
);

/*------------------------------------------------------------*\
                        JAVASCRIPT TASKS
\*------------------------------------------------------------*/

/* SHARED */

var jsLint = function() {
    return gulp
        .src([config.javascript.input, config.javascript.exclude.join()])
        .pipe($.eslint())
        .pipe($.eslint.formatEach());
};

jsLint.displayName = "Javascript Linter";

gulp.task("js:lint", jsLint);

/* PRODUCTION */

var jsCompileProd = function() {
    return gulp
        .src([config.javascript.input])
        .pipe($.rename(config.javascript.rename))
        .pipe($.uglify().on("error", handleError))
        .pipe(gulp.dest(config.javascript.output));
};

jsCompileProd.displayName = "Javascript Compiler (Production)";

gulp.task(
    "js:compile:production",
    gulp.series(gulp.parallel("js:lint"), jsCompileProd)
);

var jsWatchProd = function() {
    return gulp
        .watch([config.javascript.input], gulp.series("js:compile:production"))
        .on("change", fileLogger);
};

jsWatchProd.displayName = "Javascript Watcher (Production)";

gulp.task(
    "js:watch:production",
    gulp.series(gulp.parallel("js:compile:production"), jsWatchProd)
);

/* DEVELOPMENT */

var jsCompileDev = function() {
    return gulp
        .src([config.javascript.input])
        .pipe($.sourcemaps.init())
        .pipe($.sourcemaps.identityMap())
        .pipe($.rename(config.javascript.rename))
        .pipe($.uglify().on("error", handleError))
        .pipe($.sourcemaps.write(config.sourcemaps.folder))
        .pipe(gulp.dest(config.javascript.output));
};

jsCompileDev.displayName = "Javascript Compiler (Dev)";

gulp.task(
    "js:compile:dev",
    gulp.series(gulp.parallel("js:lint"), jsCompileDev)
);

var jsWatchDev = function() {
    return gulp
        .watch([config.javascript.input], gulp.series("js:compile:dev"))
        .on("change", fileLogger);
};

jsWatchDev.displayName = "Javascript Watcher (Dev)";

gulp.task(
    "js:watch:dev",
    gulp.series(gulp.parallel("js:compile:dev"), jsWatchDev)
);

/*------------------------------------------------------------*\
                        ASSETS TASKS
\*------------------------------------------------------------*/

var assetsFavicon = function() {
    return gulp
        .src(config.favicons.input)
        .pipe($.favicons(config.favicons.config))
        .on("error", handleError)
        .pipe(gulp.dest(config.favicons.output));
};

assetsFavicon.displayName = "Generate Favicon";

gulp.task("assets:favicon", assetsFavicon);

var assetsImages = function() {
    return gulp
        .src(config.images.input)
        .pipe($.imagemin().on("error", handleError))
        .pipe($.rename(config.images.rename))
        .pipe(gulp.dest(config.images.output));
};

assetsImages.displayName = "Minifying Images";

gulp.task("assets:images", assetsImages);

var assetsImagesWatch = function() {
    return gulp
        .watch([config.images.input], gulp.series("assets:images"))
        .on("change", fileLogger);
};

assetsImagesWatch.displayName = "Minifying Images";

gulp.task(
    "assets:images:watch",
    gulp.series(gulp.parallel("assets:images"), assetsImagesWatch)
);

/*------------------------------------------------------------*\
                        GLOBAL TASKS
\*------------------------------------------------------------*/

gulp.task("lint", gulp.series(gulp.parallel("css:lint", "js:lint")));

gulp.task(
    "watch:production",
    gulp.series(
        gulp.parallel(
            "slinky:welcome",
            "css:watch:production",
            "js:watch:production",
            "assets:images:watch"
        )
    )
);

gulp.task(
    "watch:dev",
    gulp.series(
        gulp.parallel(
            "slinky:welcome",
            "css:watch:dev",
            "js:watch:dev",
            "assets:images:watch"
        )
    )
);

gulp.task(
    "compile:dev",
    gulp.series(
        gulp.parallel(
            "slinky:welcome",
            "css:compile:dev",
            "js:compile:dev",
            "assets:images"
        )
    )
);

gulp.task(
    "compile:production",
    gulp.series(
        gulp.parallel(
            "slinky:welcome",
            "css:compile:production",
            "js:compile:production",
            "assets:images"
        )
    )
);
