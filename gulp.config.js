module.exports = function() {
	var config = {
		gulp: {
			consoleDivider:
				"---------------------------------------------------------------------"
		},

		fonts: {
			input: "./src/fonts/**/*.*",
			output: "./fonts/"
		},

		sprites: {
			input: "./src/spritesheet/**/*.svg",
			output: "./src/",
			filter: "**/*.svg",
			config: {
				cssFile: "./css/vendor/_sprites.pcss",
				preview: false,
				templates: { scss: false },
				padding: 10,
				svgPath: "../images/spritesheet/sprites-min.svg",
				pngPath: "../images/spritesheet/sprites-min.png",
				svg: {
					sprite: "images/spritesheet/sprites.svg"
				}
			}
		},

		favicons: {
			input: "./src/favicon.png",
			output: "./images/favicon/",
			config: {
				appName: "Webite",
				appDescription: "This is my website",
				developerName: "Inchoo",
				developerURL: "https://www.inchoo.net/",
				background: "#fff",
				path: "images/favicon/",
				url: "https://www.project.loc",
				display: "standalone",
				orientation: "portrait",
				start_url: "/?homescreen=1",
				version: 1.0,
				logging: false,
				online: false,
				html: "favicons.html",
				pipeHTML: true,
				replace: true
			}
		},

		css: {
			inputMain: "./src/css/**/[^_]*.{css,pcss}",
			inputAll: "./src/css/**/*.{css,pcss}",
			excludeVendor: "!src/css/vendor/**/*",
            output: "./css/",
			config: {
				atImport: { extensions: [".css", ".pcss"], prefix: "_" },
				postcssPresetEnv: {
					browsers: ["last 3 versions", "not ie<10"],
					features: {
						"nesting-rules": true
					}
				},
				cssNano: { autoprefixer: false }
			}
		},

		javascript: {
			input: "./src/js/**/*.js",
            exclude: ["!./src/js/vendor/**/*.js"],
            excludeSourcemaps: ["!./src/js/maps/*"],
			output: "./js/",
			rename: {
				suffix: ".min"
			}
		},

		images: {
			input: "./src/images/**/*.{jpg,jpeg,gif,png,svg}",
			output: "./images/",
			rename: {
				suffix: "-min"
			}
		}
	};

	return config;
};
