var express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

var path = require('path');
var serveStatic = require('serve-static');
app = express();

app.use('/api', createProxyMiddleware({ target: 'https://online-exam-mfu-api.herokuapp.com', changeOrigin: true }));


app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);
