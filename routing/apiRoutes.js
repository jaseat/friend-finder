const fs = require('fs');

function validateScores(scores){
    scores = scores.split(',');
    if(!(scores instanceof Array)){
        return false;
    }
    if(scores.length != 10){
        return false;
    }
    let valid = true;
    scores.forEach(e => {
        if(isNaN(e))
            valid = false;
        else if (e < 0 || e > 5)
            valid = false;
    });
    return valid;
}

function stringToArray(str){
    let arr = str.split(',');
    return arr.map(v => parseInt(v));
}

module.exports = app => {
    app.get('/api/friends', (req, res) => {
        let data = fs.readFileSync('./app/data/friend.json');
        data = JSON.parse(data);
        res.send(data);
    });

    app.post('/api/friends', (req, res) => {
        let {name, photo, scores} = req.body;
        if(!name || !photo || !scores || !validateScores(scores)){
            return res.status(400).send('Invalid Form');
        }
        scores = stringToArray(scores);
        let newData = {name, photo, scores};
        let data = fs.readFileSync('./app/data/friend.json');
        data = JSON.parse(data);
        data.push(newData);
        fs.writeFileSync('./app/data/friend.json', JSON.stringify(data));
        res.status(200).send('Form Submitted!');
    });
}