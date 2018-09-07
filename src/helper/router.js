const fs = require('fs');
const path = require('path');
const HanleBars = require('handlebars');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const mime = require('../helper/mime');
const compress = require('./compress');
const range = require('./range');
const isFresh = require('./cache');

const tplPath = path.join(__dirname, '../template/dir.tpl');
const source = fs.readFileSync(tplPath);
const template = HanleBars.compile(source.toString());

module.exports = async function(req, res, filePath, conf) {
  try {
    const stats = await stat(filePath);
    if (stats.isFile()) {
      const contentType = mime(filePath);
      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);
      if (isFresh(stats, req, res)) {
        res.statusCode = 304;
        res.end();
        return;
      }
      /* //  readFile 响应速度慢
      fs.readFile(filePath, (err, data) => {
        res.end(data);
      }); */
      let rs;
      const { code, start, end } = range(stat.size, req, res);
      if (code == 200) {
        res.statusCode = 200;
        rs = fs.createReadStream(filePath);
      } else {
        res.statusCode = 206;
        rs = fs.createReadStream(filePath, { start, end });
      }
      if (filePath.match(conf.compress)) {
        rs = compress(rs, req, res);
      }
      rs.pipe(res);
    } else if (stats.isDirectory()) {
      const files = await readdir(filePath);
      const dir = path.relative(conf.root, filePath);
      const data = {
        title: path.basename(filePath),
        dir: dir ? `/${dir}` : '',
        files: files.map(file => {
          return {
            file,
            icon: mime(file)
          };
        })
      };
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(template(data));
    }
  } catch (ex) {
    console.error(ex);
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end(`${filePath} is not a directory or file\n ${ex}`);
  }
};
