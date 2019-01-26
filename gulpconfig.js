module.exports = function() {
    var config = {
        browsers: ["last 3 versions", "not ie < 10", "safari >=5"],

        favicons: {
            input: "./src/favicon.png",
            output: "./images/favicon/",
            config: {
                appName: "",
                appDescription: "",
                developerName: "",
                developerURL: "",
                background: "",
                path: "",
                url: "",
                display: "",
                orientation: "",
                start_url: "",
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
                    autoprefixer: false,
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
        },

        sourcemaps: {
            folder: "/maps"
        }
    };

    return config;
};
