export const html = () => {
  return app.gulp.src(`${app.path.src.html}/*.html`)
    .pipe(app.gulp.dest(app.path.buildFolder));
}