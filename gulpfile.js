var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify');


// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('src/scss/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 3 versions', 'ie >= 9'],
        cascade: false
      }))
      .pipe(gulp.dest('dist/css'))
      .pipe(rename('style.min.css'))
      .pipe(cssnano({zindex: false}))
      .pipe(gulp.dest('dist/css/min'))
      .pipe(notify({ message: 'Styles task complete' }));
  });


  // Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')
      .pipe(concat('scripts.js'))
      .pipe(gulp.dest('dist/js'))
      .pipe(uglify())
      .pipe(rename('scripts.min.js'))
      .pipe(gulp.dest('dist/js/min'))
      .pipe(notify({ message: 'Script task complete' }));
  });


// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('src/js/*.js', ['scripts']);
  });

  gulp.task('default', ['sass', 'scripts', 'watch']);