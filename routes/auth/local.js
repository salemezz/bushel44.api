/** AUTH local routes for user authentication */
//Node level imports
const express = require('express')
const passport = require('passport')
const uc = require('../../controllers/user')

module.exports = function(){
    //Create a Router instance, so we can mount routes on that and pass it up higher in the imports.
    const Router = express.Router()
    //Allows the user to log into the application. Note, we're using the provided middleware from passport.
    Router.post('/login', passport.authenticate('local'), function(req, res){
        res.json(req.user)
    })
    //Allows the user to log out.
    Router.get('/logout', function(req, res){
        //Passport attaches a helpful logout() function on the request object that we can use.
        req.logout();
        res.json({success: true})
    })
    //Return the Router, since this has all the routes mounted on it and we have to user it higher up.
    Router.post('/register', function(req, res){
        uc.createUser(req.connection, req.body)
        .then(newUser=>res.json(newUser))
        .catch(err=>{
            console.log(err)
            res.status(500)
            res.json({
                err: 'Internal Server Error',
                message: 'Unable to create a new user.',
                stack: err
            })
        })
    })
    return Router
}