const uc = require('../controllers/user')

module.exports = function(connection){
    return {
        //This function will be passed to the LocalStrategy constructor.
        //For the Local Strategy constructor, it takes a callback with three parameters.
        //The first is the username pulled from the request body
        //Second is the password pulled from the request body
        //Third is a callback that you call with different parameters based on these states:
        //  callback(err, null) - This is a total failure
        //  callback(null, false) - This is a failed login attempt
        //  callback(null, user) - This is a successful login attempt.
        //The callback follows node function conventions, taking an error as the first parameter and data as the second.
        authenticateUser: function(username, password, done){
            connection.user.findOne({ where: { username } })
            .then(user=>{
                if(user.password !== password){
                    done(null, false)
                }
                else{
                    done(null, user)
                }
            })
            .catch(err=>{
                done(err)
            })
        },
        //This function will be provided to the passport.serializeUser function. We're just consolodating the code in a single place.
        serializeUser: function(user, done) {
            done(null, user.id)
        },
        //This function will also be provided to the passport.deserializeUser function. We're just consolodating the code in a single place.
        deserializeUser: function(id, done) {
            //Get the user using our controller, which will query our database for a single user.
            uc.getUser(connection, id)
            .then(user=>{
                //We found the coressponding user. Send it back.
                done(null, user)
            })
            .catch(err=>{
                //Something bad happened(E.g. the user doesn't exist). Don't return any data.
                done(err, null)
            })
        }
    }
}