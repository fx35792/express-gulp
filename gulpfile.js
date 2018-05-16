var gulp = require('gulp');
var bower = require('gulp-bower');
var concat = require('gulp-concat');
var csso = require('gulp-csso');
var gulpif = require('gulp-if');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var minimist = require('minimist');
var revDel = require('rev-del');
var pug = require('gulp-pug');
var del = require('del');
var vinylPaths = require('vinyl-paths');

var srcBase = './';
var destBase = './dist/';
var srcPublic = srcBase + 'public';
var destPublic = destBase + 'public';
var srcTmpl = srcBase + 'views';
var destTmpl = destBase + 'views';

var knownOptions = {
    string: 'uglify',
    default: {
        uglify: false
    }
};
var options = minimist(process.argv.slice(2), knownOptions);

gulp.task('bower', function () {
    return bower();
});

gulp.task('lint', function () {
    return gulp.src(srcBase + 'public/javascripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('compileJs', function () {
    return gulp.src(srcBase + 'public/javascripts/*.js')
        .pipe(gulpif(options.uglify == 'true', uglify()))
        .pipe(rev())
        .pipe(gulp.dest(destPublic + '/javascripts'))
        .pipe(rev.manifest())
        .pipe(revDel({
            dest: destPublic + '/javascripts'
        }))
        .pipe(gulp.dest(destPublic + '/javascripts'))
});

gulp.task('compileCss', function () {
    return gulp.src(srcBase + 'public/stylesheets/*.css')
        .pipe(gulpif(options.uglify == 'true', csso()))
        .pipe(rev())
        .pipe(gulp.dest(destPublic + '/stylesheets'))
        .pipe(rev.manifest())
        .pipe(revDel({
            dest: destPublic + '/stylesheets'
        }))
        .pipe(gulp.dest(destPublic + '/stylesheets'));
});

gulp.task('compileOther', function () {
    gulp.src(srcPublic + '/images/**')
        .pipe(gulp.dest(destPublic + '/images'));

    gulp.src(srcPublic + '/*.*')
        .pipe(gulp.dest(destPublic + '/'));
});

gulp.task('compileAll', ['lint', 'compileOther', 'compileJs', 'compileCss'], function () {
});

gulp.task('compileLibJs', function () {
    return gulp.src(srcPublic + '/lib/**')
        .pipe(gulp.dest(destPublic + '/lib'));
});

gulp.task('revReplaceViewLink', ['compileLibJs'], function () {
    var manifestJs = gulp.src(destPublic + '/javascripts/rev-manifest.json');
    var manifestCss = gulp.src(destPublic + '/stylesheets/rev-manifest.json');

    return gulp.src(srcTmpl + '/**/*.pug')
        .pipe(revReplace({
            manifest: manifestJs,
            replaceInExtensions: ['.pug']
        }))
        .pipe(revReplace({
            manifest: manifestCss,
            replaceInExtensions: ['.pug']
        }))
        .pipe(gulp.dest(destTmpl));
});

gulp.task('pug', ['revReplaceViewLink'], function () {
    return gulp.src(destTmpl + '/**/*.pug')
        .pipe(pug({}))
        .pipe(gulp.dest(destPublic));
});

//delete dist files
gulp.task('clean', function (cb) {
    return del([
        'dist'
    ], cb)
});

gulp.task('compile', ['compileAll', 'pug']);

gulp.task('default', ['compile'], function () {
    return gulp.watch([srcBase + '/**'], ['compile'])
});
