/** The user models represents a user that can log into and interact with the tool */
module.exports = function(sequelize, datatypes){
    // Here we export a function that sequelize uses during the import process on the models folder.
    const product = sequelize.define('product', {
        productName: {
            type:datatypes.STRING,
            allowNull: false
        },
        stock: {
            type:datatypes.INTEGER,
            allowNull: false
        },
        type: {
            type:datatypes.STRING,
            allowNull: false
        },
        details: {
            type:datatypes.STRING,
            allowNull: false
        },
        creatorId: {
            type:datatypes.INTEGER,
            allowNull: true
        },
        postedBy: {
            type:datatypes.STRING,
            allowNull: true
        },
        image: {
            type:datatypes.STRING,
            allowNull: true
        }
    }); 

    return product
}
