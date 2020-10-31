var express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
var history = require('connect-history-api-fallback');

var path = require('path');
var serveStatic = require('serve-static');
app = express();

app.use(history());
app.use('/api', createProxyMiddleware({ target: 'https://online-exam-mfu-api.herokuapp.com', changeOrigin: true }));


app.use(serveStatic(__dirname + "/"));
var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);
