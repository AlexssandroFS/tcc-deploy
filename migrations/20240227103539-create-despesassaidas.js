'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('despesassaidas', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            datapagto: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            descricaosaida: { // Changed from 'descricao' to 'descricaosaida'
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            valortotalsaida: {
                type: Sequelize.FLOAT,
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
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('despesassaidas');
    }
};