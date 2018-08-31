const gulp = require('gulp');
const notify = require('gulp-notify');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const babelify = require('babelify');
const ngAnnotate = require('browserify-ngannotate');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');
const templateCache = require('gulp-angular-templatecache');
const uglify = require('gulp-uglify');
const merge = require('merge-stream');

// where our files are located
const jsFiles = 'client_app/js/**/*.js';
const viewFiles = 'client_app/js/**/*.html';

const interceptErrors = function(error) {
  const args = Array.prototype.slice.call(arguments);

  // send error to notification center with gulp-notify
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  // keep gulp from hanging on this task
  this.emit('end');
};

gulp.task('browserify', ['views'], () => browserify('./client_app/js/app.js')
      .transform(babelify, { presets: ['es2015'] })
      .transform(ngAnnotate)
      .bundle()
      .on('error', interceptErrors)      
      .pipe(source('main.js'))      
      .pipe(gulp.dest('./client_app/build/')));

gulp.task('html', () => gulp.src('client_app/index.html')
      .on('error', interceptErrors)
      .pipe(gulp.dest('./client_app/build/')));

gulp.task('views', () => gulp.src(viewFiles)
      .pipe(templateCache({
        standalone: true
      }))
      .on('error', interceptErrors)
      .pipe(rename('app.templates.js'))
      .pipe(gulp.dest('./client_app/js/config/')));

/*
 * this task is used for building production ready
 * minified JS/CSS files into the dist/ folder
 */
gulp.task('build', ['html', 'browserify'], () => {
  const html = gulp.src('client_app/build/index.html')
                 .pipe(gulp.dest('./server/client/'));

  const js = gulp.src('client_app/build/main.js')
              //  .pipe(uglify())
               .pipe(gulp.dest('./server/client/'));

  return merge(html, js);
});

gulp.task('default', ['html', 'browserify'], () => {

  browserSync.init(['./client_app/build/**/**.**'], {
    server: './client_app/build',
    port: 4000,
    notify: false,
    ui: {
      port: 4001
    }
  });

  gulp.watch('client_app/index.html', ['html']);
  gulp.watch(viewFiles, ['views']);
  gulp.watch(jsFiles, ['browserify']);
});
