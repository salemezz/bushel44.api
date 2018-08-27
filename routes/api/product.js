/** API User route for CRUD operations on users of the tool */
//Node level imports
const express = require('express')
const middleware = require('../../libraries/middleware')
//User level imports
const pd = require('../../controllers/product')
const path = require('path');
const cloudinary = require('cloudinary');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
cloudinary.config({ 
    cloud_name: 'dozenuld4', 
    api_key: '397267885241469', 
    api_secret: 'M09wFePJ-7ECZwtKdB1qdCtGGcQ' 
  });

module.exports = function() {
    //Create a Router instance, so we can mount routes on that and pass it up higher in the imports.
    const Router = express.Router()
    //Get all the users.
    Router.get('/products', function(req, res) {
        console.log(res)

        pd.getProducts(req.connection)
            .then(products => {
                res.json(products)
            })
            .catch(err => {
                console.log(err)
                res.status(500)
                res.json({
                    err: 'Internal Server Error',
                    message: 'Unable to get products.',
                    stack: err
                })
            });
    })
    // //Get a specific user by id.
    // Router.get('/myProducts', function(req, res){
    //     console.log(res)
    //     console.log('test')
    //     pd.getMyProducts(req.connection)
    //     .then(products=>{
    //         res.json(products)
    //     })  
    //     .catch(err=>{
    //         console.log(err)
    //         res.status(500)
    //         res.json({
    //             err: 'Internal Server Error',
    //             message: 'Unable to get products.',
    //             stack: err
    //         })
    //     });
    // })

    Router.get('/products/:id', function(req, res) {
        pd.getProducts(req.connection, [req.params.id])
            .then(products => res.json(products[0]))
            .catch(err => {
                console.log(err)
                res.status(500)
                res.json({
                    err: 'Internal Server Error',
                    message: 'Unable to get product.',
                    stack: err
                })
            })
    })

    Router.post('/products', multipartMiddleware, function(req, res) {
        //let uploadedFile = req.body;
        console.log("HERE");
        console.log(req.files.image);
        //console.log(uploadedFile);
        // uploadedFile.mv(path.join(__dirname, `/public/uploads/${uploadedFile.name}`), function(err) {
        //     if (err) {
        //         console.log(err);
        //         return res.status(500).send(err);
        //     }
        // });
        console.log(req.files.image.path);
        cloudinary.v2.uploader.upload(req.files.image.path, 
            { width: 2000, height: 1000, crop: "limit" },
            function(result) { 
            req.body.image = result.url;

            pd.createProduct(req.connection, req.body)
                .then(newProduct => res.json(newProduct))
                .catch(err => {
                    console.log(err)
                    res.status(500)
                    res.json({
                        err: 'Internal Server Error',
                        message: 'Unable to create a new product.',
                        stack: err
                    })
                })
          });

    });
    //Router.post('/productImage', function(req, res){
    //console.log('test:' + req.connection);
    //var buffer = new Buffer(req.body,'base64');
    //fs.writeFile('myUploadImage.png',buffer);
    //})
    // Router.post('/products', function (req, res) {
    //     req.connection.product.create(req.body)
    //         .then(newProduct => {
    //             console.log('test:' + newProduct.id)
    //             req.connection.user.findOne({
    //                 where: {
    //                     id: newProduct.id
    //                 }
    //             }).then((user) => {
    //                 user.setProduct(newProduct.id)
    //             }).then(() => {
    //                 req.json(newProduct.dataValues)
    //             })
    //         })
    //         .catch(err => {
    //             console.log(err)
    //             res.status(500)
    //             res.json({
    //                 err: 'Internal Server Error',
    //                 message: 'Unable to create a new product.',
    //                 stack: err
    //             })
    //         })
    // })
    //Edits an existing user. This is a protected route, so only logged in users can access this route.
    Router.put('/products/:id', function(req, res) {
        pd.editProduct(req.connection, req.params.id, req.body)
        then(product => res.json(product))
            .catch(err => {
                console.log(err)
                res.status(500)
                res.json({
                    err: 'Internal Server Error',
                    message: 'Unable to edit product.',
                    stack: err
                })
            })
    })
    //Deletes a user. This is a protected route, so only logged in users can access this route.
    Router.delete('/products/:id', function(req, res) {
        console.log("test")
        pd.removeProduct(req.connection, req.params.id)
            .then(product => res.json(product))
            .catch(err => {
                console.log(err)
                res.status(500)
                res.json({
                    err: 'Internal Server Error',
                    message: 'Unable to delete product.',
                    stack: err
                })
            })
    })
    return Router
}