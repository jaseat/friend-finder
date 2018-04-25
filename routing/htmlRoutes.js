const fs = require('fs');
const path = require('path');

module.exports = app => {
    app.get('/survey', (req, res) => {
        fs.readFile('./public/survey.html', 'utf8', (err, data) => {
            if(err) throw err;
            res.send(data);
        });
    });
    app.get('/', (req, res) => {
        fs.readFile('./public/home.html', 'utf8', (err, data) => {
            if(err) throw err;
            res.send(data);
        });
    });
    app.get('*', (req, res) => {
        res.redirect('/');
    })
}