# Slinky Frontend Toolbox

**_*Everything and the kitchen sink!*_**

This is the ultimate toolbox for frontend developers powered by Node and Gulp.

It contains PostCSS compilation, code linting, code minification, image and font assets handler, spritesheet generator and favicon generator.

Default config for file structure and build structure was made with creating Magento themes in mind, but can be easily configured.

## General Information

`src/` is your working directory. Keep all your working files here, Gulp tasks will take care of distributing assets and code to their respective build locations.

### Folders in `src` folder:

*   `fonts/` - Folder for theme fonts files (any files and extensions, including json files).
*   `images/` - Folder for theme image files (jpg, jpeg, gif, png, svg).
*   `js/` - Folder for Javascript files.
*   `js/vendor/` - Folder for vendor Javascript files that will not be linted during build.
*   `css/` - Folder for CSS / PCSS files. `css/styles.pcss` is the main entry point.
*   `css/vendor/` - Folder for vendor CSS / PCSS files that will not be linted during build.

**Please note:** Files that are added directly to the build folders (outside `src`) may get deleted during build or when the cleaning task is being run.

## Features

### Dev watchers (with linters)

*   PostCSS
*   JavaScript minifier

### PostCSS plugins

*   postcss-easy-import
*   postcss-mixins
*   postcss-nested
*   postcss-cssnext (with autoprefixer)
*   cssnano
*   lost grid

### Assets watchers

*   Image minification
*   Font Handler
*   Favicon generation
*   Spritesheet generation

### Linters:

*   CSS Lint
*   JavaScript Lint

### Tools:

*   Spritesheet Generator
*   Favicon Generator
*   Font Handler
*   Image Minification
*   Autoprefixer

### Configs:

*   Gulp
*   CSS linter
*   JSHint
*   JSCS

## Requirements

*   NodeJS version 8.x (version 9.x not supported)

## Installation

In Parent folder, run

```shell
 npm run slinky:setup
```

## NPM Scripts

Run the scripts from the parent folder

### Dev Watcher

Runs dev watchers with linters (CSS and JavaScript)

```shell
npm run dev
```

```shell
npm run dev:watch
```

### Assets Watcher

Runs assets watchers (Fonts, Images, Spritesheet, Favicon)

```shell
npm run assets
```

```shell
npm run assets:watch
```

### Clean Task

**Removes all files** from the following folders `/js`, `/css`, `images`, `fonts`.

```shell
npm run clean
```

### Test Task

Runs Javascript linter and CSS linter.

```shell
npm run test
```

### Individual Tasks

Compiles PCSS to CSS

```shell
npm run dev:compile:css
```

Minifies Javascript

```shell
npm run dev:minify:javascript
```

Lints Javascript

```shell
npm run dev:lint:javascript
```

Lints CSS

```shell
npm run dev:lint:css
```

### Individual Watchers

Compiles PCSS to CSS

```shell
npm run dev:watch:css
```

Minifies Javascript

```shell
npm run dev:watch:javascript
```

## Configuration

**Only edit these files when necessary. The current setup ensures best practices when writing Javascript and CSS code.**

### Gulp Config

Gulp config is handled by the `gulp.config.js` located in the parent folder. Following definitions can be found there:

*   File input and output paths
*   File suffixes
*   PostCSS Compiler & Plugins config
*   Autoprefixer config
*   Spritesheet generator config
*   Favicon generator config

#### Note

Autoprefixer config:
http://browserl.ist/
https://github.com/sindresorhus/gulp-autoprefixer

Spritesheet Generator config:
https://github.com/shakyshane/gulp-svg-sprites

Favicon Generator:
https://github.com/evilebottnawi/favicons

### Javascript Linter Config

Javascript config is handled by the `.jscrc` and `jshintrc` files for JSRC and JSHint respectively.

JSRC is a code style linter and formatter, while JSHint is a code quality tool.

#### Note:

JSRC config info: http://jscs.info/rules

JSHint config info:
http://jshint.com/docs/options/

### CSS Linter Config

CSS linter config is handled by the `.stylelintrc` file in parent folder.

#### Note:

CSS linter config info: https://stylelint.io/user-guide/rules/

## License

MIT License
Copyright (c) 2018. Adrian Bece

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
