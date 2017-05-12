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
    spritesmith  = require('gulp.spritesmith'),
    eslint       = require('gulp-eslint'),
    rigger       = require('gulp-rigger');

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
		.pipe(gulp.dest('public/img'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function() {
	return gulp.src('js/main.js')
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(rigger())
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError())
    .pipe(concat('build.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/js'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('css', ['less-to-css'], function() {
	return gulp.src(['css/**/*', 'public/css/build.css'])
    .pipe(concat('build.css'))
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('public/css'))
    .pipe(browserSync.reload({stream: true}));
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

gulp.task('build', ['clean', 'img', 'scripts', 'less-to-css', 'css'], function() {
  var build_fonts =
    gulp.src('fonts/**/*')
	      .pipe(gulp.dest('public/fonts'))

  var build_json =
    gulp.src('json/**/*')
        .pipe(gulp.dest('public/json'))

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

gulp.task('watch', ['browser-sync', 'img', 'less-to-css', 'css', 'scripts'], function() {
  gulp.watch('less/**/*', ['less-to-css']);
  gulp.watch(['css/**/*', 'public/css/build.css'], ['css']);
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
  
  gulp.watch('json/**/*', function() {
    gulp.src('json/**/*')
        .pipe(gulp.dest('public/json'));
      browserSync.reload();
  })
})

gulp.task('default', ['watch']);
