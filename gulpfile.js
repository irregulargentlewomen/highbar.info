var gulp  = require("gulp");
var gutil = require("gulp-util");
var jade  = require("gulp-jade");
var del   = require("del");

var paths = {
  "src": {
    "templates": "./src/templates/**/[!_]*.jade"
  },
  "build": {
    "root": "./build"
  },
  "dist": {
    "root": "./dist"
  },
  "data": {
    "meta":   "./data/meta.json",
    "people": "./data/people.json"
  }
};

var compiledTemplates = function() {
  var templateData = {};
  templateData.meta   = require(paths.data.meta);
  templateData.people = require(paths.data.people);

  return gulp.src(paths.src.templates)
           .pipe(jade({locals: templateData, pretty: true}));
}

gulp.task('build:templates', ['clean:build:templates'], function() {
  compiledTemplates().pipe(gulp.dest(paths.build.root));
});

gulp.task('dist:templates', ['clean:dist:templates'], function() {
  compiledTemplates().pipe(gulp.dest(paths.dist.root));
});

gulp.task('watch', function() {
  gulp.watch(paths.src.templates, ['build:templates']);
  gulp.watch(paths.data.meta,     ['build:templates']);
  gulp.watch(paths.data.people,   ['build:templates']);
});

gulp.task('clean:build:templates', function() {
  del(paths.build.root + '/**/*.html');
});

gulp.task('clean:dist:templates', function() {
  del(paths.dist.root + '/**/*.html');
});

gulp.task('build', ['build:templates']);

gulp.task('dist', ['dist:templates']);
