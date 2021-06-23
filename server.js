const browserSync = require('browser-sync');
const bs = browserSync.create();

function serve() {
  bs.init({
    port: 10086,
    files: 'output/**',
    server: {
      baseDir: ['output', 'dist', 'assets']
    }
  })
}

module.exports = {
  serve
}