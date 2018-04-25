const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 8080;

app.listen(port);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

require('./routing/apiRoutes')(app);
require('./routing/htmlRoutes')(app);

server.listen();