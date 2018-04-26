const fs = require('fs');
const path = require('path');

module.exports = app => {
    app.get('*', (req, res) => {
        console.log(req.originalUrl);
        if(req.originalUrl != '/home' || req.originalUrl != '/survey'){
            res.redirect('/home');
        }
    })
}