const http = require('http');
const express = require('express');
const logger = require('morgan');

const app = express();
const port = process.env.PORT || 8080;
app.set('port', port);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const options = {
    extensions: ['html'],
    index: 'home.html'
};

app.use(express.static('./public', options));

require('./routing/apiRoutes')(app);
require('./routing/htmlRoutes')(app);

const server = http.createServer(app);

server.listen(port);