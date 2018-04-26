const fs = require('fs');

function validateScores(scores){
    if(!(scores instanceof Array)){
        return false;
    }
    if(scores.length != 10){
        return false;
    }
    let valid = true;
    scores.forEach(e => {
        e = parseInt(e);
        if(isNaN(e))
            valid = false;
        else if (e < 0 || e > 5)
            valid = false;
    });
    return valid;
}

function stringToArray(str){
    if(!str) return null;
    return str.split(',').map(v => parseInt(v));
}

function findMatch(person){
    let bestScore = 100;
    let match = 0;
    let friends = fs.readFileSync('./app/data/friend.json');
    friends = JSON.parse(friends);
    friends.forEach( (friend, index) => {
        let score = 0;
        for(let i = 0; i < friend.scores.length; i++){
            score += Math.abs(friend.scores[i] - person.scores[i]);
        }
        if (score < bestScore){
            bestScore = score;
            match = index;
        }
    });
    return friends[match];
}

module.exports = app => {
    app.get('/api/friends', (req, res) => {
        let data = fs.readFileSync('./app/data/friend.json');
        data = JSON.parse(data);
        res.send(data);
    });

    app.post('/api/friends', (req, res) => {
        let {name, photo, scores} = req.body;
        scores = (typeof scores === 'string') ? stringToArray(scores) : scores.map(v => parseInt(v));
        if(!name || !photo || !scores || !validateScores(scores)){
            return res.status(400).send('Invalid Form');
        }
        let newData = {name, photo, scores};
        let data = fs.readFileSync('./app/data/friend.json');
        let match = findMatch(newData);
        data = JSON.parse(data);
        data.push(newData);
        fs.writeFileSync('./app/data/friend.json', JSON.stringify(data));
        res.status(200).send(match);
    });
}