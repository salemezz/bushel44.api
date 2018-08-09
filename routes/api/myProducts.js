/** API User route for CRUD operations on users of the tool */
//Node level imports
const express = require('express')
const middleware = require('../../libraries/middleware')
//User level imports
const pd = require('../../controllers/product')

module.exports = function(){
    //Create a Router instance, so we can mount routes on that and pass it up higher in the imports.
    const Router = express.Router()
    //Get all the users.
    Router.post('/myProducts', function(req, res){
        console.log("req.body: " + JSON.stringify(req.body))
        pd.getMyProducts(req.connection, req.body.thisUser)
        .then(thisUser=>{
            console.log('test2')
            res.json(thisUser)
            // console.log(res)
        })  
        .catch(err=>{
            console.log('fail2')
            console.log(err)
            res.status(500)
            res.json({
                err: 'Internal Server Error',
                message: 'Unable to get products.',
                stack: err
            })
        });
    })
    // Router.post('/search/Result', fucntion(req, res)){

    // }
    return Router
}