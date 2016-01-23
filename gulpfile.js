var gulp = require("gulp");
var jade = require("gulp-jade");

var paths = {
  "src": {
    "templates": "./src/templates/**/*.jade"
  },
  "build": {
    "root": "./build"
  },
  "dist": {
    "root": "./dist"
  }
};

gulp.task('build:templates', function() {
  gulp.src(paths.src.templates)
    .pipe(jade())
    .pipe(gulp.dest(paths.build.root));
});

gulp.task('dist:templates', function() {
  gulp.src(paths.src.templates)
    .pipe(jade())
    .pipe(gulp.dest(paths.dist.root));
});

gulp.task('watch', function() {
  gulp.watch(paths.src.templates, ['build:templates']);
});

gulp.task('dist', ['dist:templates']);
