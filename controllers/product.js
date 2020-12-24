/** Controller for generic CRUD operations on users */
module.exports = {
    createProduct: function(connection, data){
        // console.log('***' + data.userId)
        return connection.product.create(data)
        .then(newProduct=>newProduct.dataValues)
    },
    searchProducts: function(connection, data){
        // return connection.product.findAll(ids !== undefined ? {where: {productName: productName}} : {})
        // .then(selectedProduct=>selectedProduct.map(s=>s.dataValues))
        // console.log('test')
        // console.log("connection within searchProducts is: " + connection)     
        return connection.product.findAll(data !== undefined ? {where: {productName: {like: '%' + data}}} : {})
        .then(selectedProduct=>selectedProduct.map(s=>s.dataValues))       
    },
    getMyProducts: function(connection, data){
        // return connection.product.findAll(ids !== undefined ? {where: {productName: productName}} : {})
        // .then(selectedProduct=>selectedProduct.map(s=>s.dataValues))
        // console.log('test')
        // console.log("connection within searchProducts is: " + connection)
        return connection.product.findAll(data !== undefined ? {where: {creatorId: data }} : {})
        .then(selectedProduct=>selectedProduct.map(s=>s.dataValues))       
    },
    getProducts: function(connection, ids){
        // console.log('ids: ' + ids)
        return connection.product.findAll(ids !== undefined ? {where: {id: ids}} : {})
        .then(selectedProduct=>selectedProduct.map(s=>s.dataValues))
    },
    getProduct: function(connection, id){
        return connection.product.findOne({where: {id}})
        .then(selectedProduct=>selectedProduct.dataValues)
    },
    editProduct: function(connection, id, data){
        return connection.product.findOne({where: {id}})
        .then(product=>product.update(data))
        .then(product=>product.dataValues)
    },
    removeProduct: function(connection, id){
        return connection.product.destroy({where: {id}})
        .then(product=>product.dataValues)
    }
}