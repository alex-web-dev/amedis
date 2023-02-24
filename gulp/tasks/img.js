import gulpif from 'gulp-if';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';

export const img = () => {
	return app.gulp.src(`${app.path.src.img}/**/*.{jpg,jpeg,png,svg,gif}`)
		.pipe(gulpif(app.isProd, imagemin([
			imagemin.gifsicle({ interlaced: true }),
			imagemin.mozjpeg({ quality: 75, progressive: true }),
			imagemin.optipng({
				optimizationLevel: 3,
			}),
			imagemin.svgo({
				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
				]
			}),
			pngquant({quality: [0.7, 0.8], speed: 4})
		])))
		.pipe(app.gulp.dest(app.path.build.img));
}