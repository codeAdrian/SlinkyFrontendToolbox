/**
 * JSCS config docs:
 * -----------------
 *
 * https://github.com/jscs-dev/node-jscs/tree/master/presets
 * http://jshint.com/docs/options/
 * https://github.com/sasstools/sass-lint
 *
 */

module.exports = function() {
    var config = {
        /**
         * Gulp config
         */

        consoleDivider:
            '-----------------------------------------------------------------',

        /**
         * SCSS Linter Config
         */

        scssLintConfig: {
            options: {
                formatter: 'stylish',
                'merge-default-rules': true
            },
            files: { ignore: '**/normalize.scss' }
        },

        /**
         * CSS Input/Output Config
         */

        cssInput: '../scss/**/*.scss',
        cssOutput: '../../css/',

        /**
         * Javascript Input/Output Config
         */

        jsSkinInput: '../js/**/*.js',
        jsSkinOutput: '../../js/',

        /**
         * Javascript Rename Config
         */

        jsRename: { suffix: '.min' },

        /**
         * Images Input/Output Config
         */

        imageInput: '../images/**/*.{jpg,jpeg,gif,png,svg}',
        imageOutput: '../../images/',

        /**
         * Images Rename Config
         */

        imgRename: {
            suffix: '-min'
        },

        /**
         * SASS Config
         */

        sass: {
            errLogToConsole: true,
            outputStyle: 'compressed'
        },

        /**
         * Autoprefixer Config
         */

        autoprefixer: {
            browsers: ['last 4 versions', 'not ie <= 8'],
            cascade: false
        }
    };
    return config;
};
