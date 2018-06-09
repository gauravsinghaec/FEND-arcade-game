var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

// Compile sass into CSS & auto-inject into browser
gulp.task('sass',function () {
    return gulp.src(['scss/style.scss'])
        .pipe(sass())
        .pipe(autoprefixer( { browsers: ['last 2 versions']} ))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

// Static Servers + watching html/scss files
gulp.task('serve',function () {
    browserSync.init({
        server: "."
    });
    gulp.watch(['scss/style.scss'],['sass']);
    gulp.watch('*.html').on('change',browserSync.reload);
});

gulp.task('default',['serve']);