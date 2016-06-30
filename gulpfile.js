'use strict';
 
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
 
// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src('./css/scss/styles.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

// Import bootstrap JS
gulp.task('bootstrap-js', function() {
    return gulp.src('./node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js')
        .pipe(gulp.dest('./js/vendor'))
        .pipe(browserSync.stream());
});
 
// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: './'
    });

    gulp.watch('css/scss/*.scss', ['sass']);
    gulp.watch(['*.html', 'js/*.js', 'css/*.css']).on('change', browserSync.reload);
});

gulp.task('build', ['sass', 'bootstrap-js']);

gulp.task('default', ['serve']);