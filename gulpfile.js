var gulp = require('gulp'),
    concat = require('gulp-concat'),
    prefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug');  


gulp.task('style', function() {
    return gulp.src('src/scss/main.scss')
    .pipe(sass())
    .pipe(prefix('last 2 versions'))
    .pipe(concat('public/css/main.css'))
    .pipe(gulp.dest('public/css'))
});


gulp.task('watch', function() {
    gulp.watch('./src/Scss/**/*.scss', gulp.series('style'))
});

gulp.task('default', gulp.parallel('style', 'watch'));
    
    