const express = require('express');
const expressBars = require('express-handlebars');
const path = require('path');
//#######################################################
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
express.static(path.join(__dirname, 'views'));
app.engine('.hbs', expressBars({
    defaultLayout: false,
    extname: '.hbs'
}))
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));


//#######################################################
const allusers = [
    {name: `Vika`, age: 18, password: 1111, email: `Vika@gmail.com`},
    {name: `Taras`, age: 20, password: 2222, email: `Taras@gmail.com`},
    {name: `Katya`, age: 40, password: 3333, email: `Katya@gmail.com`},
    {name: `Andriy`, age: 18, password: 4444, email: `Andriy@gmail.com`},
];
let status = false;
//#######################################################
app.get(`/`, (req, res) => {
    res.render(`loginPage`)
});
//#######################################################
app.post('/log', (req, res) => {
    const {login, password} = req.body;
    const userIndex = allusers.findIndex(user => {
        status = user.email == login && user.password == password;
        return status;
    });

    if (userIndex > -1) {
        res.write(`You is singing in`)
    } else {
        res.write(`sing up pls`);
    }
    res.end()
})
//#######################################################
app.get(`/allUsers`, (require, request) => {
    request.render(`allUsers`, {allusers});
})
//#######################################################
app.get(`/regestration`, (require, request) => {
    request.render(`regPage`);
})
// #######################################################
app.post('/reg', (req, res) => {
    const {login, age, password, smoke, name} = req.body;
    allusers.push(req.body);
    res.write(`NICE YOU IS REG`);
    res.end();
})
// #######################################################
app.listen(6969, (err) => {
    if (err) {
    } else {
        console.log(`Server work. Port 6969`)
    }
});
