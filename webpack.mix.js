let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix.js('src/js/dog.js', 'public/js/')
    .js('src/js/clues.js', 'public/js/')
    .js('src/js/labo.js', 'public/js/')
    .sass('src/scss/main.scss', 'public/css/')
    .options({
        processCssUrls: false,
    });

