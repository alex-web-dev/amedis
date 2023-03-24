import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import merge from 'merge-stream';

export const scripts = () => {
  const vendors = app.gulp.src([
    'node_modules/swiper/swiper-bundle.js',
    'node_modules/smoothscroll-polyfill/dist/smoothscroll.js',
  ])
  .pipe(concat('vendors.js'))
  .pipe(app.gulp.dest(app.path.build.js));

  const scripts = app.gulp.src([
    `${app.path.src.js}/*.js`
  ])
  .pipe(concat('app.js'))
  .pipe(app.gulp.dest(app.path.build.js));

  return merge(vendors, scripts);
}