const express = require('express');
const hbs = require('hbs');
const fs = require('fs');



var app = express();


hbs.registerPartials(__dirname + '/views/partials'); //PARTIALS
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));  // __dirname stores the past to project directly (node-web-server)

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url} `;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Hello ');
        }
    });
    next();
});

app.use((req,res,next) => {
    res.render('maintenance.hbs');
});


hbs.registerHelper('getCurrentYear', () => {
return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

//(root, (request, response))  request stores info about request coming in ||| response has a bunch of methods available to you, customize data you sent back.
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page', 
        welcomeMessage: 'Welcome to our App'
    })
});



app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'Aboot Page'      
    });  
     //render lets you render any templates set up with current view engine
    //second argument                                       
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(3000, () => {
    console.log('Bruh, server running on port 3k');
});