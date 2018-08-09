'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('products', [
			{
				productName: 'Brucer Banner',
				stock: 5,
				type: 'Flower',
				details: 'good smoke',
				createdAt: new Date(),
				updatedAt: new Date()
			}
		], {})
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('users', {});
	}
};
