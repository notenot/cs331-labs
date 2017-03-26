var gulp         = require('gulp'),
    less         = require('gulp-less'),
    concat       = require('gulp-concat'),
    del          = require('del'),
    browserSync  = require('browser-sync'),
	  autoprefixer = require('gulp-autoprefixer'),
    imagemin     = require('gulp-imagemin'),
	  pngquant     = require('imagemin-pngquant'),
    cache        = require('gulp-cache'),
    uglify       = require('gulp-uglifyjs'),
    cssnano      = require('gulp-cssnano'),
    rename       = require('gulp-rename'),
    spritesmith  = require('gulp.spritesmith');

gulp.task('less-to-css', function() {
  return gulp.src('less/**/*')
             .pipe(concat('build.less'))
             .pipe(less()) // convert to css using gulp-less
             .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		         .pipe(gulp.dest('public/css'))
             .pipe(browserSync.reload({stream: true}))
});

gulp.task('img', function() {
	return gulp.src('img/**/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('public/img'));
});

gulp.task('scripts', function() {
	return gulp.src('js/**/*')
		.pipe(concat('build.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/js'));
});

gulp.task('css', ['less-to-css'], function() {
	return gulp.src(['css/**/*', 'public/css/build.css'])
    .pipe(concat('build.css'))
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('public/css'));
});

gulp.task('sprite', function() {
    var spriteData =
        gulp.src('img/services/*.*')
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.less',
                cssFormat: 'less',
                algorithm: 'binary-tree',
                cssVarMap: function(sprite) {
                    sprite.name = 's-' + sprite.name
                }
            }));

    spriteData.img.pipe(gulp.dest('img')); // TODO
    spriteData.css.pipe(gulp.dest('less'));
});

gulp.task('clean', function() {
	return del.sync('public');
});

gulp.task('build', ['clean', 'img', 'scripts', 'less-to-css'], function() {
  var build_fonts =
    gulp.src('fonts/**/*')
	      .pipe(gulp.dest('public/fonts'))

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

gulp.task('watch', ['browser-sync', 'img', 'scripts', 'css'], function() {
  gulp.watch('less/**/*', ['less-to-css']);
  gulp.watch('img/**/*', ['img']);
  gulp.watch('js/**/*', ['scripts']);

  gulp.watch('*.html', function() {
    gulp.src('*.html')
	      .pipe(gulp.dest('public'));
    browserSync.reload();
  })

  gulp.watch('fonts/**/*', function() {
    gulp.src('fonts/**/*')
	      .pipe(gulp.dest('public/fonts'));
    browserSync.reload();
  })
})

gulp.task('default', ['watch']);
