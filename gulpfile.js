const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
//imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');



const css = function( done ) {
    // Compilar sass
    // paso 1 : Identificar archiv
    // paso 2: Compilarla
    //paso 3: GUardar el .css


// CSS Y SASS
    src('src/scss/app.scss')
        .pipe( sourcemaps.init())
        .pipe( sass() )
        .pipe( postcss( [autoprefixer(), cssnano() ]) )
        .pipe( sourcemaps.write('.'))
        .pipe( dest('build/css') )

    done();
}


//IMAGENES


const img = function ( done ) {
    src('src/img/**/*')
        .pipe(imagemin({ optimizationlevel: 3}))
        .pipe( dest('build/img') );
    done();
}


const versionWebp = function() {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe( webp( opciones ))
        .pipe( dest('build/img'))
}

const versionAvif = function() {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png, jpg}')
        .pipe( avif( opciones ))
        .pipe( dest('build/img'))
}

const dev = function () {
    watch ( 'src/scss/**/*.scss', css);
    watch( 'src/img/**/*', img );
}


exports.css = css;
exports.dev = dev;
exports.img = img;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series( img, versionWebp, versionAvif, css, dev );

// series - Se inicia una tarea, y hasta que finaliza, inicia la siguiente