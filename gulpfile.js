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
 *                        adrianbece.code@gmail.com
 *                        codeadrian.github.io
 *                        @AdrianBDesigns
 */

/*------------------------------------------------------------*\
                    GULP SETUP & REQUIRES
\*------------------------------------------------------------*/

var gulp = require("gulp"),
	$ = require("gulp-load-plugins")({ lazy: true }),
	cssnano = require("cssnano"),
	atImport = require("postcss-easy-import"),
	lost = require("lost"),
	mixins = require("postcss-mixins"),
	postcssPresetEnv = require("postcss-preset-env");

var config = require("./gulp.config")();

/*------------------------------------------------------------*\
                      CUSTOM FUNCTIONS
\*------------------------------------------------------------*/

/**
 * Handle Promise Rejection errors
 */
process.on("unhandledRejection", error => {
	throw error;
});

/**
 * @param {String} msg
 * Logs messages in terminal
 */
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

/**
 * @param {Event} e
 * Logs code errors in terminal
 */
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

/*------------------------------------------------------------*\
                        GLOBAL TASKS
\*------------------------------------------------------------*/
/**
 * Used for both Development and Production Builds of code
 */

/**
 * Type: Task
 * Environment: Global
 * Dependency: n/a
 * Description: CSS linting
 */
gulp.task("slinky:css:lint", function() {
	return gulp.src([config.css.inputAll, config.css.excludeVendor]).pipe(
		$.stylelint({
			reporters: [{ formatter: "string", console: true }]
		})
	);
});

/**
 * Type: Task
 * Environment: Global
 * Dependency: n/a
 * Description: Javascript linting
 */
gulp.task("slinky:js:lint", function() {
	return gulp
		.src([config.javascript.input, config.javascript.exclude.join()])
		.pipe($.jscs())
		.pipe($.jshint())
		.pipe($.jshint.reporter("jshint-stylish", { verbose: true }))
		.pipe($.jshint.reporter("fail").on("error", handleError));
});

/**
 * Type: Task
 * Environment: Global
 * Dependency: Favicon image file
 * Description: Generates favicons
 */
gulp.task("slinky:favicon:generate", function() {
	return gulp
		.src(config.favicons.input)
		.pipe($.favicons(config.favicons.config))
		.on("error", handleError)
		.pipe(gulp.dest(config.favicons.output));
});

/**
 * Type: Task
 * Environment: Global
 * Dependency: n/a
 * Description: Minifies and optimizes images for web
 */
gulp.task("slinky:images:generate", function() {
	return gulp
		.src(config.images.input)
		.pipe($.imagemin().on("error", handleError))
		.pipe($.rename(config.images.rename))
		.pipe(gulp.dest(config.images.output));
});

/**
 * Type: Task
 * Environment: Global
 * Dependency: n/a
 * Description: Moves fonts to a font folder
 */
gulp.task("slinky:fonts:generate", function() {
	return gulp.src(config.fonts.input).pipe(gulp.dest(config.fonts.output));
});

/**
 * Type: Task
 * Environment: Global
 * Dependency: svg image with minimal dimensions 1x1px
 * Description: Generates SVG and PNG spritesheet based on SVG icons, also creates CSS file with icons.
 */
gulp.task("slinky:spritesheet:generate", function() {
	return gulp
		.src(config.sprites.input)
		.pipe($.svgSprites(config.sprites.config).on("error", handleError))
		.pipe(gulp.dest(config.sprites.output).on("error", handleError))
		.pipe($.filter(config.sprites.filter).on("error", handleError))
		.pipe($.svg2png().on("error", handleError))
		.pipe(gulp.dest(config.sprites.output));
});

/*------------------------------------------------------------*\
                        GLOBAL WATCHERS
\*------------------------------------------------------------*/
/**
 * Used for both Development and Production Builds of code
 */

/**
 * Type: Watch
 * Environment: Global
 * Dependency: n/a
 * Description: Spritesheet generator watcher
 */
gulp.task(
	"slinky:spritesheet:watch",
	["slinky:spritesheet:generate"],
	function() {
		return gulp
			.watch([config.sprites.input], ["slinky:spritesheet:generate"])
			.on("change", function(event) {
				log(
					"Spritesheet file: " +
						event.path +
						" was " +
						event.type +
						". Generating spritesheet..."
				);
			});
	}
);

/**
 * Type: Watch
 * Environment: Global
 * Dependency: n/a
 * Description: Font file watcher
 */
gulp.task("slinky:fonts:watch", ["slinky:fonts:generate"], function() {
	return gulp
		.watch(config.fonts.input, ["slinky:fonts:generate"])
		.on("change", function(event) {
			log(
				"Font file " +
					event.path +
					" was " +
					event.type +
					". Moving fonts..."
			);
		});
});

/**
 * Type: Watch
 * Environment: Global
 * Dependency: n/a
 * Description: Image minifier watcher
 */
gulp.task("slinky:images:watch", ["slinky:images:generate"], function() {
	return gulp
		.watch([config.images.input], ["slinky:images:generate"])
		.on("change", function(event) {
			log(
				"Image file " +
					event.path +
					" was " +
					event.type +
					". Minifying Images..."
			);
		});
});

/**
 * Type: Watcher
 * Environment: Global
 * Dependency: n/a
 * Description: Favicon Watcher
 */
gulp.task("slinky:favicon:watch", ["slinky:favicon:generate"], function() {
	return gulp
		.watch([config.sprites.input], ["slinky:favicon:generate"])
		.on("change", function(event) {
			log(
				"Javascript file " +
					event.path +
					" was " +
					event.type +
					". Minifying Javascipt in PRODUCTION mode..."
			);
		});
});

/*------------------------------------------------------------*\
                    DEVELOPMENT TASKS
\*------------------------------------------------------------*/

/**
 * Type: Task
 * Environment: Development
 * Dependency: slinky:css:lint
 * Description: Compile CSS
 */
gulp.task("dev:css:compile", ["slinky:css:lint"], function() {
	var plugins = [
		atImport(config.css.config.atImport),
		mixins,
		lost,
		postcssPresetEnv(config.css.config.postcssPresetEnv),
		cssnano(config.css.config.cssNano)
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
});

/**
 * Type: Task
 * Environment: Development
 * Dependency: slinky:js:lint
 * Description: Minify Javascript
 */
gulp.task("dev:js:compile", ["slinky:js:lint"], function() {
	return gulp
		.src([
			config.javascript.input
		])
		.pipe($.sourcemaps.init())
		.pipe($.sourcemaps.identityMap())
		.pipe($.rename(config.javascript.rename))
		.pipe($.uglify().on("error", handleError))
		.pipe($.sourcemaps.write(config.sourcemaps.folder))
		.pipe(gulp.dest(config.javascript.output));
});

/*------------------------------------------------------------*\
                    DEVELOPMENT WATCHERS
\*------------------------------------------------------------*/

/**
 * Type: Watch
 * Environment: Development
 * Dependency: dev:css:compile
 * Description: CSS Watcher
 */
gulp.task("dev:css:watch", ["dev:css:compile"], function() {
	return gulp
		.watch([config.css.inputAll], ["dev:css:compile"])
		.on("change", function(event) {
			log(
				"PostCSS file " +
					event.path +
					" was " +
					event.type +
					". Compiling PostCSS in DEVELOPMENT mode..."
			);
		});
});

/**
 * Type: Watch
 * Environment: Development
 * Dependency: dev:js:compile
 * Description: JS Watcher
 */
gulp.task("dev:js:watch", ["dev:js:compile"], function() {
	return gulp
		.watch([config.javascript.input], ["dev:js:compile"])
		.on("change", function(event) {
			log(
				"Javascript file " +
					event.path +
					" was " +
					event.type +
					". Minifying Javascipt in DEVELOPMENT mode..."
			);
		});
});

/*------------------------------------------------------------*\
                    	PRODUCTION TASKS
\*------------------------------------------------------------*/

/**
 * Type: Task
 * Environment: Production
 * Dependency: slinky:css:lint
 * Description: Compile CSS for production (minified and without sourcemaps)
 */
gulp.task("prod:css:compile", ["slinky:css:lint"], function() {
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
				extname: ".css"
			})
		)
		.pipe(gulp.dest(config.css.output));
});

/**
 * Type: Task
 * Environment: Production
 * Dependency: slinky:js:lint
 * Description: Minify Javascript
 */
gulp.task("prod:js:compile", ["slinky:js:lint"], function() {
	return gulp
		.src([
			config.javascript.input
		])
		.pipe($.rename(config.javascript.rename))
		.pipe($.uglify().on("error", handleError))
		.pipe(gulp.dest(config.javascript.output));
});

/*------------------------------------------------------------*\
                    PRODUCTION WATCHERS
\*------------------------------------------------------------*/

/**
 * Type: Watcher
 * Environment: Production
 * Dependency: prod:css:compile
 * Description: CSS Compilation Watcher
 */
gulp.task("prod:css:watch", ["prod:css:compile"], function() {
	return gulp
		.watch([config.css.inputAll], ["prod:css:compile"])
		.on("change", function(event) {
			log(
				"PostCSS file " +
					event.path +
					" was " +
					event.type +
					". Compiling PostCSS in PRODUCTION mode..."
			);
		});
});

/**
 * Type: Watcher
 * Environment: Production
 * Dependency: prod:js:compile
 * Description: JS Compilation Watcher
 */
gulp.task("prod:js:watch", ["prod:js:compile"], function() {
	return gulp
		.watch([config.javascript.input], ["prod:js:compile"])
		.on("change", function(event) {
			log(
				"Javascript file " +
					event.path +
					" was " +
					event.type +
					". Minifying Javascipt in PRODUCTION mode..."
			);
		});
});

/*------------------------------------------------------------*\
                      GULP TASK RUNNERS
\*------------------------------------------------------------*/

gulp.task("slinky:lint", ["slinky:css:lint", "slinky:js:lint"]);

gulp.task("dev:code:generate", [
	"dev:css:compile",
	"dev:js:compile"
]);

gulp.task("dev:code:watch", [
	"dev:css:watch",
	"dev:js:watch"
]);

gulp.task("prod:code:generate", [
	"prod:css:compile",
	"prod:js:compile"
]);

gulp.task("prod:code:watch", [
	"prod:css:watch",
	"prod:js:watch"
]);

gulp.task("prod:assets:generate", [
	"slinky:images:generate",
	"slinky:favicon:generate",
	"slinky:spritesheet:generate",
	"slinky:fonts:generate"
]);

gulp.task("prod:assets:watch", [
	"slinky:spritesheet:watch",
	"slinky:images:watch",
	"slinky:favicon:watch",
	"slinky:fonts:watch"
]);

gulp.task("slinky:dev:compile", [
	"dev:css:compile",
	"dev:js:compile",
	"slinky:images:generate",
	"slinky:favicon:generate",
	"slinky:spritesheet:generate",
	"slinky:fonts:generate"
]);

gulp.task("slinky:dev:watch", [
	"dev:css:watch",
	"dev:js:watch",
	"slinky:favicon:watch",
	"slinky:images:watch",
	"slinky:spritesheet:watch",
	"slinky:fonts:watch"
]);

gulp.task("slinky:prod:compile", [
	"prod:css:compile",
	"prod:js:compile",
	"slinky:images:generate",
	"slinky:favicon:generate",
	"slinky:spritesheet:generate",
	"slinky:fonts:generate"
]);

gulp.task("slinky:prod:watch", [
	"prod:css:watch",
	"prod:js:watch",
	"slinky:favicon:watch",
	"slinky:images:watch",
	"slinky:spritesheet:watch",
	"slinky:fonts:watch"
]);

gulp.task("default", ["slinky:prod:watch"]);
