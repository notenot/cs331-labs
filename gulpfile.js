var gulp   = require('gulp'),
    less   = require('gulp-less'),
    concat = require('gulp-concat'),
    del    = require('del');

gulp.task('less-to-css', function() {
  return gulp.src('less/*.less')
             .pipe(concat('build.less'))
             .pipe(less()) // convert to css using gulp-less
             // .pipe(rename('build.css'))
             .pipe(gulp.dest('public/css'))
});

// + JS (gulp-uglifyjs)
// + img

gulp.task('clean', function() {
	return del.sync('public');
});

gulp.task('build', ['clean', 'less-to-css'], function() {
  var build_css = gulp.src('css/*')
                      .pipe(gulp.dest('public/css'))

  var build_fonts = gulp.src('fonts/**/*')
	                      .pipe(gulp.dest('public/fonts'))

  var build_img = gulp.src('img/*')          // TODO: image processing
                      .pipe(gulp.dest('public/img'))

  // var build_js = gulp.src('js/**/*')
	//                    .pipe(gulp.dest('public/js'))

  var build_html = gulp.src('*.html')
	                     .pipe(gulp.dest('public'));
})

gulp.task('default', ['build']);
