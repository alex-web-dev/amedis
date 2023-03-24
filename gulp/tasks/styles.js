import postcss from 'gulp-postcss';
import cleanCss from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import tildeImporter from 'node-sass-tilde-importer';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import gulpif from 'gulp-if';
import browserSync from 'browser-sync';
import merge from 'merge-stream';
import concatCss from 'gulp-concat-css';

const sass = gulpSass(dartSass);

export const styles = () => {
  const vendors = app.gulp.src([
    'node_modules/normalize.css/normalize.css',
    'node_modules/swiper/swiper-bundle.css',
  ])
  .pipe(concatCss('vendors.css'))
  .pipe(gulpif(app.isProd, postcss([autoprefixer])))
  .pipe(app.gulp.dest(app.path.build.css));

  const styles = app.gulp.src(`${app.path.src.sass}/${app.path.src.sassEntryFile}`)
    .pipe(gulpif(app.isDev, sourcemaps.init()))
    .pipe(sass({
      importer: tildeImporter,
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulpif(app.isProd, postcss([autoprefixer])))
    .pipe(gulpif(app.isDev, sourcemaps.write()))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(browserSync.stream());

    return merge(vendors, styles);
}