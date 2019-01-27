# Slinky Frontend Toolbox

**_*Powerful, modern, configurable Frontend task runner*_**

This is the ultimate toolbox for frontend developers powered by Node and Gulp.

It contains powerful PostCSS compiler, CSS linter (stylelint), minifier and optimizer (cssnano & media query grouping), JavaScript linter (ESLint), minifier and optimizer (UglifyJS), and assets handler & optimizer (images and favicons).

Default config for file structure and build structure was made with creating Magento themes in mind, but can be easily configured.

This toolbox works in 2 modes:

-   Development - non-minified CSS and JavaScript compilation with SourceMaps ready for debugging.
-   Production - minified and production-optimized CSS and JavaScript without SourceMaps.

## General Information

`src/` is your working directory for CSS, JavaScript and images.

### Folders in `src` folder:

-   `images/` - Folder for theme image files (jpg, jpeg, gif, png, svg).
-   `js/` - Folder for JavaScript files.
-   `js/vendor/` - Folder for vendor Javascript files that will not be linted during build.
-   `css/` - Folder for CSS / PCSS files. `css/styles.pcss` is the main entry point.
-   `css/vendor/` - Folder for vendor CSS / PCSS files that will not be linted during build.

## Features

### Dev watchers (with linters)

-   PostCSS
-   JavaScript minifier

### PostCSS plugins

-   postcss-easy-import
-   postcss-mixins
-   postcss-preset-env
-   autoprefixer
-   normalize.css
-   css-mqpacker
-   cssnano
-   lost grid

### Assets watchers

-   Image Minification
-   Favicon Generator

### Linters:

-   CSS Linter
-   JavaScript Linter

### Tools:

-   Favicon Generator
-   Image Minification
-   Autoprefixer

### Configs:

-   Gulp
-   Stylelint
-   ESLint

## Requirements

-   NodeJS version 8 and newer (even 11 is suported)

## Installation

In Parent folder, run

```shell
 npm run setup
```

## NPM Scripts

Run the scripts from the parent folder

### Main Watcher Scripts

#### Development

Runs all toolbox watchers (CSS, JavaScript and Image Handler) in development mode.

```shell
 npm run watch:dev
```

#### Production

Runs all toolbox watchers (CSS, JavaScript and Image Handler) in production mode

```shell
 npm run watch:production
```

### Individual Scripts

#### Development

Runs all toolbox tasks (CSS, JavaScript and Image Handler) in development mode once.

```shell
 npm run generate:dev
```

#### Production

Runs all toolbox tasks (CSS, JavaScript and Image Handler) in production mode once.

```shell
 npm run generate:production
```

<br/>

### Additional Scripts

Runs CSS and JavaScript linting tasks

```shell
 npm run lint
```

<br/>

Generates favicon assets.

```shell
 npm run generate:favicon"
```

<br/>

Generate minified image assets.

```shell
 npm run generate:images
```

<br/>

## Configuration

**Only edit these files when necessary. The current setup ensures best practices when writing Javascript and CSS code.**

### Gulp Config

Gulp config is handled by the `gulpconfig.js` located in the parent folder. Following definitions can be found there:

-   File input and output paths
-   File suffixes
-   PostCSS Compiler & Plugins config
-   Autoprefixer config
-   Favicon generator config

#### Note

postcss-preset-env: https://preset-env.cssdb.org/features

Autoprefixer config:
http://browserl.ist/

https://github.com/sindresorhus/gulp-autoprefixer

Favicon Generator:
https://github.com/evilebottnawi/favicons

### Javascript Linter Config

Javascript config is handled by the ESlint.

#### Note:

JSRC config info: https://eslint.org/docs/user-guide/configuring

### CSS Linter Config

CSS linter config is handled by the `.stylelintrc` file in parent folder.

#### Note:

CSS linter config info: https://stylelint.io/user-guide/rules/

## License

MIT License
Copyright (c) 2019. Adrian Bece

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
