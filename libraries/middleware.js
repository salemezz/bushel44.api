/** Custom created middleware */
module.exports = {
    //This middleware just checks for user authentication by looking for the user key on the request object.
    checkAuthentication: function(req, res, next){
        console.log(req.user)
        req.user ? next() : res.sendStatus(403)  
    },
    //This middleware just attaches the database connection to the request object.
    //It returns a function to create a closure that has access to the database connection reference.
    databaseHandler: function(connection){
        return function(req, res, next){
            req.connection = connection
            next()
        }
    }
}