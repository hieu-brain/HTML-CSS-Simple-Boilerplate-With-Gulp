const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
 
// Setup Server
gulp.task('server', function () {
    browserSync.init({
        online: true,
        open: 'external',
        injectChanges: true,
        startPath: "/",
        // browser: 'google chrome',//['firefox'],
        server: {
            baseDir: "./dist/",    		// Direction
            index: "index.html"      	// HTML Run Page
        },
        ghostMode: {
            clicks: true,
            forms: true,
            scroll: false
        }
    });
});

//Styles Task
gulp.task('styles', function() {
    return  gulp.src('src/**/*.css')
		        .pipe(sourcemaps.init())
		        .pipe(autoprefixer({
		            browsers: ["last 2 versions", "Android >= 4.2", "ios >= 8", "ie >= 7"]
		        }))
		        .pipe(gulp.dest('dist/'))
		        .pipe(browserSync.stream());
});

//HTML Task
gulp.task('html', function() {
    return  gulp.src('src/**/*.html')
        		.pipe(gulp.dest('dist'));
});

//Javascript Task
gulp.task('scripts', function() {
    return 	gulp.src('src/**/*.js')
        		.pipe(gulp.dest('dist'));
});

// Reload Browser
gulp.task('bs-reload', function () {
    browserSync.reload();
});

// Reload Browser
gulp.task('bs-stream', function () {
    browserSync.stream();
});

//Watches task
gulp.task('watch', function(){
    // Watch .css files
    gulp.watch('src/css/**/*.css', ['styles']);

    // Watch .js files
    gulp.watch('src/js/**/*.js', ['scripts']);

    // Watch html files
    gulp.watch('src/*.html', ['html','bs-reload']);
});

// Run
gulp.task('default', ['watch', 'server', 'styles', 'html', 'scripts'], function () {
    gulp.watch("./dist/*.html", ['bs-reload']);
    gulp.watch("./dist/css/*.css", ['bs-stream']);
    gulp.watch("./dist/js/*.js", ['bs-reload']);
});
