'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('users', [
			{
				username: 'admin',
				first_name: 'Super',
				last_name: 'Admin',
				password: 'password',
				createdAt: new Date(),
				updatedAt: new Date()
			}
		], {})
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('users', {});
	}
};
