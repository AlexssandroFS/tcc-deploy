'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('produtossaidas', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            qtdsaida: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            valorunitariosaida: {
                type: Sequelize.DOUBLE(10, 2),
                allowNull: false,
            },
            valortotalsaida: {
                type: Sequelize.DOUBLE(10, 2),
                allowNull: false,
            },
            datasaida: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('NOW'),
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('NOW'),
            }
        })

    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('produtossaidas');
    }
};