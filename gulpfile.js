var gulp       = require("gulp");
var gutil      = require("gulp-util");
var jade       = require("gulp-jade");
var compass    = require("gulp-compass");
var connect    = require("gulp-connect");
var browserify = require("browserify");
var source     = require("vinyl-source-stream");
var buffer     = require("vinyl-buffer");
var del        = require("del");
var debug      = require("gulp-debug");

var paths = {
  "src": {
    "templates": "./src/templates/**/*.jade",
    "components": "./src/components/**/*",
    "stylesheets": "./src/stylesheets/**/*.scss",
    "javascripts": "./src/javascripts/app.js"
  },
  "build": {
    "root": "./build",
    "templates": "./build/**/*.html",
    "stylesheets": "./build/stylesheets",
    "javascripts": "./build/javascripts"
  },
  "dist": {
    "root": "./dist",
    "templates": "./dist/**/*.html",
    "stylesheets": "./dist/stylesheets",
    "javascripts": "./dist/javascripts"
  },
  "data": {
    "meta":   "./data/meta.json",
    "people": "./data/people.json"
  }
};

gulp.task('build:templates', ['clean:build:templates'], function() {
  var templateData = {};
  templateData.meta   = require(paths.data.meta);
  templateData.people = require(paths.data.people);

  gulp.src(paths.src.templates)
    .pipe(jade({locals: templateData, pretty: true}))
    .pipe(gulp.dest(paths.build.root))
    .pipe(connect.reload());
});

gulp.task('build:stylesheets', ['clean:build:stylesheets'], function() {
  gulp.src(paths.src.stylesheets)
    .pipe(compass({sass: "./src/stylesheets", css: "/tmp/compass_out"}))
    .pipe(gulp.dest(paths.build.stylesheets))
    .pipe(connect.reload());
});

gulp.task('build:javascripts', ['clean:build:javascripts'], function() {
  return browserify({
    entries: paths.src.javascripts,
    debug: true
  }).bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest(paths.build.javascripts))
    .pipe(connect.reload());
});

gulp.task('dist:templates', ['build:templates', 'clean:dist:templates'], function() {
  gulp.src(paths.build.templates)
    .pipe(gulp.dest(paths.dist.root));
});

gulp.task('dist:stylesheets', ['build:stylesheets', 'clean:dist:stylesheets'], function() {
  gulp.src(paths.build.stylesheets)
    .pipe(gulp.dest(paths.dist.stylesheets));
});

gulp.task('dist:javascripts', ['build:javascripts', 'clean:dist:javascripts'], function() {
  gulp.src(paths.build.javascripts)
    .pipe(gulp.dest(paths.dist.javascripts));
});

gulp.task('watch', function() {
  gulp.watch(paths.src.templates,   ['build:templates']);
  gulp.watch(paths.src.components,  ['build:templates']);
  gulp.watch(paths.data.meta,       ['build:templates']);
  gulp.watch(paths.data.people,     ['build:templates']);
  gulp.watch('./CONTRIBUTING.md',   ['build:templates']);
  gulp.watch('./CREDITS.md',        ['build:templates']);
  gulp.watch(paths.src.stylesheets, ['build:stylesheets']);
  gulp.watch(paths.src.javascripts, ['build:javascripts']);
});

gulp.task('server:dev', function() {
  connect.server({
    "root": "./build",
    "livereload": true
  });
});

gulp.task('clean:build:templates', function() {
  del(paths.build.templates);
});

gulp.task('clean:build:stylesheets', function() {
  del(paths.build.stylesheets);
});

gulp.task('clean:build:javascripts', function() {
  del(paths.build.javascripts);
});

gulp.task('clean:dist:templates', function() {
  del(paths.dist.templates);
});

gulp.task('clean:dist:stylesheets', function() {
  del(paths.dist.stylesheets);
});

gulp.task('clean:dist:javascripts', function() {
  del(paths.dist.javascripts);
});

gulp.task('build', ['build:templates', 'build:stylesheets', 'build:javascripts']);

gulp.task('dist', ['dist:templates', 'dist:stylesheets', 'dist:javascripts']);

gulp.task('dev', ['build', 'server:dev', 'watch']);
