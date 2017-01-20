/*eslint-env node*/
'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create(),

    input = {
        sass: [
            'src/**/*.scss'
        ]
    };

gulp.task('default', ['watch']);

gulp.task('build', function () {
    gulp.src('src/js/jquery.dcd.doubletaptogo.js')
        .pipe(uglify({
            preserveComments: 'license'
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist'));

    gulp.src('src/js/jquery.dcd.doubletaptogo.js').pipe(gulp.dest('dist'));
});

gulp.task('css', function () {
    gulp.src(input.sass)
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(prefixer('last 2 version'))
        .pipe(gulp.dest(function (file) {
            return file.base;
        }));
});

gulp.task('watch', ['prepare', 'serve'], function () {
    gulp.watch(input.sass, ['css']);
});

gulp.task('serve', function () {
    browserSync.init(
        {
            notify: false,
            logLevel: 'info',
            logConnections: false,
            logFileChanges: false,
            injectChanges: true,
            files: ['./**/*.{html,htm,css,js}'],
            watchOptions: {
                ignored: 'node_modules'
            },
            server: {
                baseDir: './src/'
            }
        }
    );
});

gulp.task('prepare', ['css'], function () {
    gulp.src('node_modules/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('src/lib/'));
});
