const express = require('express');
const fs = require('fs');
const port = 3000;
const Chance = require('chance');

// create an app handle to configure our server
const app = express();

// Middleware
app.use(express.static('css'));
// app.use(express.static('img')); // you can serve multiple static directories
app.use(express.urlencoded({ extended: true })); // lets you read form contents easily

let visitCount = 0;
let activeName = undefined;
let myChance = new Chance();

// add a handler for the / path
app.get('/', function(req, res) {

    visitCount++;
    
    const fileContents = fs.readFileSync('./templates/index.html', 'utf-8');
    const formFileContents = fs.readFileSync('./templates/nameform.html', 'utf-8');
    
    let updatedPage = fileContents.replace('%%%VISIT%%%', visitCount);
    if (activeName === undefined) {
        updatedPage = updatedPage.replace('%%%NAMEFORM%%%', formFileContents);
    } else {
        updatedPage = updatedPage.replace('%%%NAMEFORM%%%', '<p>Welcome, ' + activeName + '!</p>');
    }
    
    
    res.send(updatedPage);
    
});

app.get('/random', function(req, res) {

    const fileContents = fs.readFileSync('./templates/random.html', 'utf-8');
    const newName = myChance.name();
    const finalPage = fileContents.replace('%%%NAME%%%', newName);
    res.send(finalPage);

});

app.post('/name', function(req, res) {

    const name = req.body.name;
    activeName = name;

    res.redirect('/');

});

// start listening
app.listen(port, function() {
    console.log("app listening on port " + port);
});