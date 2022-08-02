const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const app = express();

const forceSSL = function () {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
};
app.use(express.static('./dist/recruit-angular'));


app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname,'/dist/recruit-angular/index.html'));
});

app.use(forceSSL());

let port = process.env.PORT || 8080;
app.listen(port);
