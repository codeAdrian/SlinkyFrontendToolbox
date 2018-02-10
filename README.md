# Echo Frontend Toolkit

## General Information
**Author:** Adrian Bece <br/>
**License:** MIT OR Apache 2.0 <br/>
**Version:** 3.1.0 <br/>
**Features:**
* Gulp tasks and watchers
* SASS/SCSS Compilation
* Compass SASS/SCSS Vertical Rhythm Included
* Autoprefixer Included
* Javascript Minification
* Image Minification

## Requirements
* NodeJS version 8 and above (excluded 9)

## Installation
In Parent folder, run <br/>
```npm install```

## Commands
Run the scripts from the parent folder

Default Watcher - runs all watchers (SCSS/SASS, Javascript, Images)
```
npm run echo:watch
```

Task - Compiles SCSS/SASS to CSS
```
npm run echo:compile:sass
```

Task - Minifies Javascript
```
npm run echo:minify:javascript
```

Task - Minifies Images
```
npm run echo:minify:images
```

Watcher - Compiles SCSS/SASS to CSS
```
npm run echo:watch:sass
```

Watcher - Minifies Javascript
```
npm run echo:watch:javascript
```
Watcher - Minifies Images
```
npm run echo:watch:images
```

## Configuration
### Autoprefixer config
In package.json, browserslist config:
```
  "browserslist": [
    "last 4 versions",
    "not ie <= 8"
  ],
```

Use http://browserl.ist/ for config.

## License
MIT License
Copyright (c) 2018. Adrian Bece

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.