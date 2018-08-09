/** Entrypoint for the server */
//Node level imports
require('dotenv').config();
const connection = require('./models')
const express = require('express')
const session = require('express-session')
const axios = require('axios')
const bodyParser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const productController = require('./controllers/product')
//User level imports
const authentication = require('./libraries/authentication')(connection)
const middleware = require('./libraries/middleware')

//Global variable for port, determined by environmental variables.
const PORT = process.env.PORT || 8080
//Create an instance of the express application.
const app = express()
//Configure express to use sessions. 
//Currently, we use the in-memory session engine by default, but we would use Redis or MemCache in production.
app.use(session({
    secret: "test",
    resave: false,
    saveUnitialized: false
}))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    // res.header('Content-Type': 'application/json'); 
    next();
});

//Configure body-parser middleware to parse the http request body as json.
app.use(bodyParser.json())

//Tell express to use passport middleware.
app.use(passport.initialize())
app.use(passport.session())

//Configure passport to use local strategy
passport.use(new LocalStrategy(authentication.authenticateUser))
passport.serializeUser(authentication.serializeUser)
passport.deserializeUser(authentication.deserializeUser)

//Configure custom database middleware to attach connection to all request objects.
app.use(middleware.databaseHandler(connection))

//Mount the routes onto their specific paths.
app.use('/api', require('./routes/api/')())
app.use('/auth', require('./routes/auth')())
// app.get('/api/products', function(req, res) {
//     res.json(productController.getProducts(req.connection));
// })
//Automatically add new tables to the database as needed.
connection.sequelize.sync()
    .then(() => {
        app.listen(PORT, () => console.log(`Connection established on port: ${PORT}`))
    })
    .catch(err => {
        console.log(`Error: ${err}`)
    })