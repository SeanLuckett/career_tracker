var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    eslint = require('gulp-eslint'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat');

gulp.task('default', function() {
  console.log('You done launched the default task.');
});

gulp.task('lint', function() {
  return gulp.src(['./src/**/*.es6'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('babel-dev', ['lint'], function() {
  return gulp.src(['./src/**/*.module.es6', './src/**/*.es6'])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dev_build'));
});

gulp.task('styles', function() {
  return sass('./src/**/*.scss', {style: 'expanded'})
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('./dev_build/css/'))
    .pipe(concat('main.css'))
    .pipe(notify({message: 'Styles task complete'}));
});

gulp.task('watch', ['babel-dev'], function() {
  gulp.watch('./src/**/*.es6', ['babel-dev']);
});

