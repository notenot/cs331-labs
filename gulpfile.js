var gulp        = require('gulp'),
    less        = require('gulp-less'),
    concat      = require('gulp-concat'),
    del         = require('del'),
    browserSync = require('browser-sync');

gulp.task('less-to-css', function() {
  return gulp.src('less/*.less')
             .pipe(concat('build.less'))
             .pipe(less()) // convert to css using gulp-less
             // .pipe(rename('build.css'))
             .pipe(gulp.dest('public/css'))
             .pipe(browserSync.reload({stream: true}))
});

// + JS (gulp-uglifyjs)
// + img
// + prefix

gulp.task('clean', function() {
	return del.sync('public');
});

gulp.task('build', ['clean', 'less-to-css'], function() {
  var build_css =
    gulp.src('css/*.css')
        .pipe(gulp.dest('public/css'))

  var build_fonts =
    gulp.src('fonts/**/*')
	      .pipe(gulp.dest('public/fonts'))

  var build_img =
    gulp.src('img/**/*')          // TODO: image processing
        .pipe(gulp.dest('public/img'))

  // var build_js = gulp.src('js/**/*')
	//                    .pipe(gulp.dest('public/js'))

  var build_html =
    gulp.src('*.html')
	      .pipe(gulp.dest('public'))
})

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'public'
		},
		notify: false
	});
});

gulp.task('watch', ['browser-sync', 'less-to-css'], function() {
  gulp.watch('less/*.less', ['less-to-css']);

  gulp.watch('*.html', function() {
    gulp.src('*.html')
	      .pipe(gulp.dest('public'));
    browserSync.reload();
  })

  gulp.watch('img/**/*', function() {
    gulp.src('img/**/*')
	      .pipe(gulp.dest('public/img'));
    browserSync.reload();
  })

  gulp.watch('fonts/**/*', function() {
    gulp.src('fonts/**/*')
	      .pipe(gulp.dest('public/fonts'));
    browserSync.reload();
  })

  gulp.watch('css/*.css', function() {
    gulp.src('css/*.css')
	      .pipe(gulp.dest('public/css'));
    browserSync.reload();
  })
})

gulp.task('default', ['watch']);
