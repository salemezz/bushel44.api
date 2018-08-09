/** The user models represents a user that can log into and interact with the tool */
module.exports = function(sequelize, datatypes){
    // Here we export a function that sequelize uses during the import process on the models folder.

    const user = sequelize.define('user', {
        username: {
            type:datatypes.STRING,
            allowNull: false
        },
        first_name: {
            type:datatypes.STRING,
            allowNull: false
        },
        last_name: {
            type:datatypes.STRING,
            allowNull: false
        },
        password: {
            type:datatypes.STRING,
            allowNull: false
        },
        email: {
            type:datatypes.STRING,
            allowNull: false
        },
        business_name: {
            type:datatypes.STRING,
            allowNull: false
        }
    });

    return user
}