var gulp    = require("gulp");
var gutil   = require("gulp-util");
var jade    = require("gulp-jade");
var compass = require("gulp-compass");
var del     = require("del");

var paths = {
  "src": {
    "templates": "./src/templates/**/[!_]*.jade",
    "stylesheets": "./src/stylesheets/**/*.scss"
  },
  "build": {
    "root": "./build",
    "templates": "./build/**/*.html",
    "stylesheets": "./build/stylesheets"
  },
  "dist": {
    "root": "./dist",
    "templates": "./dist/**/*.html",
    "stylesheets": "./dist/stylesheets"
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
    .pipe(gulp.dest(paths.build.root));
});

gulp.task('build:stylesheets', ['clean:build:stylesheets'], function() {
  gulp.src(paths.src.stylesheets)
    .pipe(compass({sass: "./src/stylesheets", css: "/tmp/compass_out"}))
    .pipe(gulp.dest(paths.build.stylesheets));
});

gulp.task('dist:templates', ['build:templates', 'clean:dist:templates'], function() {
  gulp.src(paths.build.templates)
    .pipe(gulp.dest(paths.dist.root));
});

gulp.task('dist:stylesheets', ['build:stylesheets', 'clean:dist:stylesheets'], function() {
  gulp.src(paths.build.stylesheets)
    .pipe(gulp.dest(paths.dist.stylesheets));
});

gulp.task('watch', function() {
  gulp.watch(paths.src.templates,   ['build:templates']);
  gulp.watch(paths.data.meta,       ['build:templates']);
  gulp.watch(paths.data.people,     ['build:templates']);
  gulp.watch(paths.src.stylesheets, ['build:stylesheets']);
});

gulp.task('clean:build:templates', function() {
  del(paths.build.templates);
});

gulp.task('clean:build:stylesheets', function() {
  del(paths.build.stylesheets);
});

gulp.task('clean:dist:templates', function() {
  del(paths.dist.templates);
});

gulp.task('clean:dist:stylesheets', function() {
  del(paths.dist.stylesheets);
});

gulp.task('build', ['build:templates', 'build:stylesheets']);

gulp.task('dist', ['dist:templates', 'dist:stylesheets']);

gulp.task('develop', ['build', 'watch']);
