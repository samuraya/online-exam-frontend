require('dotenv').config();
var express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
var history = require('connect-history-api-fallback');

var path = require('path');
var serveStatic = require('serve-static');
app = express();

app.use(history({ 
  verbose: true
}));


app.use('/api', createProxyMiddleware({ target: process.env.API || 'localhost', changeOrigin: true }));
app.use('/uploads/images/', createProxyMiddleware({ target: process.env.API || 'localhost', changeOrigin: true }));

app.use(serveStatic(__dirname + "/"));
var port = process.env.PORT || 5000;

app.listen(port);
console.log('server started '+ port);
