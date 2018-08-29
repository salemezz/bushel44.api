const express = require('express')
const middleware = require('../../libraries/middleware')
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

    const Router = express.Router()

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
        // console.log(req.files.image);
        //console.log(uploadedFile);
        // uploadedFile.mv(path.join(__dirname, `/public/uploads/${uploadedFile.name}`), function(err) {
        //     if (err) {
        //         console.log(err);
        //         return res.status(500).send(err);
        //     }
        // });
        console.log(req.files.image.path);
        cloudinary.uploader.upload(req.files.image.path, function(result) { 
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

    Router.put('/products/:id', multipartMiddleware, function(req, res) {
        // console.log("HERE");
        // console.log(req.files.image.path);
        // cloudinary.uploader.upload(req.files.image.path, function(result) { 
        //     req.body.image = result.url;

        pd.editProduct(req.connection, req.params.id, req.body)
        .then(product => res.json(product))
            .catch(err => {
                console.log(err)
                res.status(500)
                res.json({
                    err: 'Internal Server Error',
                    message: 'Unable to edit product.',
                    stack: err
                })
            })
        });

    Router.put('/products/:id/imageUpload', multipartMiddleware, function(req, res) {
        console.log("HERE");
        console.log(req.files.image.path);
        cloudinary.uploader.upload(req.files.image.path, function(result) { 
            req.body.image = result.url;

        pd.editProduct(req.connection, req.params.id, req.body)
        .then(product => res.json(product))
            .catch(err => {
                console.log(err)
                res.status(500)
                res.json({
                    err: 'Internal Server Error',
                    message: 'Unable to edit product.',
                    stack: err
                })
            })
        });
    });


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