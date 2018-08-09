/** Controller for generic CRUD operations on users */
module.exports = {
    createUser: function(connection, data){
        return connection.user.create(data)
        .then(newUser=>newUser.dataValues)
    },
    getUsers: function(connection, ids){
        return connection.user.findAll(ids !== undefined ? {where: {id: ids}} : {})
        .then(selectedUsers=>selectedUsers.map(s=>s.dataValues))
    },
    getUser: function(connection, id){
        return connection.user.findOne({where: {id}})
        .then(selectedUser=>selectedUser.dataValues)
    },
    editUser: function(connection, id, data){
        return connection.user.findOne({where: {id}})
        .then(user=>user.update(data))
        .then(user=>user.dataValues)
    },
    removeUser: function(connection, id){
        return connection.user.destroy({where: {id}})
        .then(user=>user.dataValues)
    }
}