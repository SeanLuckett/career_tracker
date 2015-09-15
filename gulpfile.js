var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    eslint = require('gulp-eslint'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require('gulp-notify'),
    gls = require('gulp-live-server'),
    concat = require('gulp-concat');

gulp.task('default', function() {
  console.log('You done launched the default task.');
});

gulp.task('serve', ['babel-dev', 'styles', 'html', 'watch'], function() {
  var server = gls.static(['dev_build']);
  server.start();

  gulp.watch([
    './dev_build/**/*.js',
    './dev_build/**/*.html',
    '.dev_build/**/*.css'
  ], function(file) {
    server.notify.apply(server, [file]);
  });
});

gulp.task('lint', function() {
  return gulp.src(['./app/**/*.es6'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('babel-dev', ['lint'], function() {
  return gulp.src(['./app/**/*.module.es6', './app/**/*.es6'])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dev_build'));
});

gulp.task('styles', function() {
  return sass('./app/**/*.scss', {style: 'expanded'})
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('./dev_build/css/'))
    .pipe(concat('main.css'))
    .pipe(notify({message: 'Styles task complete'}));
});

gulp.task('html', function() {
  return gulp.src(['./app/**/*.html'])
    .pipe(gulp.dest('./dev_build'));
});

gulp.task('watch', ['babel-dev'], function() {
  gulp.watch('./app/**/*.es6', ['babel-dev']);
  gulp.watch('./app/**/*.scss', ['styles']);
  gulp.watch('./app/**/*.html', ['html']);
});

