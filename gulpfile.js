var gulp = require('gulp');
var browserify = require('browserify');
var vinylSource = require('vinyl-transform');
var rename = require('gulp-rename');
var del = require('del');
var babelify = require('babelify');

var srcDir = 'src/';
var destDir = 'dist';

var paths = {
    app: ['./src/js/page/index.jsx'],
    js: ['src/js/**/*.jsx']
};

gulp.task('clean', function(done) {
    del(['build'], done);
});
gulp.task('build', function() {
    var browserified = vinylSource(function(filename) {
        var b = browserify(filename, {debug: true});
        return b.bundle();
    });

    return gulp.src(paths.app)
        .pipe(browserified)
        .pipe(rename('app.js'))
        .pipe(gulp.dest('dist/page/js'));
});

gulp.task('watch', function() {
    gulp.watch(paths.js, ['build']);
});

gulp.task('default', ['build']);
