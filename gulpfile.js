var gulp  = require("gulp");
var gutil = require("gulp-util");
var jade  = require("gulp-jade");


var paths = {
  "src": {
    "templates": "./src/templates/**/*.jade"
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

gulp.task('build:templates', function() {
  compiledTemplates().pipe(gulp.dest(paths.build.root));
});

gulp.task('dist:templates', function() {
  compiledTemplates().pipe(gulp.dest(paths.dist.root));
});

gulp.task('watch', function() {
  gulp.watch(paths.src.templates, ['build:templates']);
  gulp.watch(paths.data.meta,     ['build:templates']);
  gulp.watch(paths.data.people,   ['build:templates']);
});

gulp.task('build', ['build:templates']);

gulp.task('dist', ['dist:templates']);
