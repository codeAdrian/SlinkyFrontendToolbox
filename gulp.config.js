module.exports = function() {
    var config = {
        gulp: {
            consoleDivider:
                '---------------------------------------------------------------------'
        },

        fonts: {
            input: 'src/fonts/**/*.*',
            output: 'fonts/'
        },

        sprites: {
            input: 'src/spritesheet/**/*.svg',
            output: 'images/spritesheet/',
            tempOutput: 'src/images/spritesheet/sprite',
            templatePath: 'src/scss/vendor/',
            suffix: '-min',
            config: {
                cssPathSvg: '../images/spritesheet/sprite-min.svg',
                cssPathNoSvg: '../images/spritesheet/sprite-min.png',
                templateSrc: 'src/spritesheet/config/template.tpl',
                templateDest: 'src/scss/vendor/_sprite.scss',
                padding: 10,
                positioning: 'vertical'
            }
        },

        favicons: {
            input: 'src/favicon.png',
            output: 'images/favicon/',
            config: {
                appName: 'Webite',
                appDescription: 'This is my website',
                developerName: 'Inchoo',
                developerURL: 'https://www.inchoo.net/',
                background: '#fff',
                path: 'images/favicon/',
                url: 'https://www.project.loc',
                display: 'standalone',
                orientation: 'portrait',
                start_url: '/?homescreen=1',
                version: 1.0,
                logging: false,
                online: false,
                html: 'favicons.html',
                pipeHTML: true,
                replace: true
            }
        },

        css: {
            input: 'src/scss/**/*.scss',
            output: 'css/',

            autoprefixer: {
                browsers: ['last 4 versions', 'not ie <= 8'],
                cascade: false
            },

            sass: {
                errLogToConsole: true,
                outputStyle: 'compressed'
            }
        },

        javascript: {
            input: 'src/js/**/*.js',
            exclude: '!src/js/vendor/**/*.js',
            output: 'js/',
            rename: {
                suffix: '.min'
            }
        },

        images: {
            input: 'src/images/**/*.{jpg,jpeg,gif,png,svg}',
            output: 'images/',
            rename: {
                suffix: '-min'
            }
        }
    };

    return config;
};
