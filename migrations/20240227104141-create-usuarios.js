'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('usuarios', {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                nome: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                cpf: {
                    type: Sequelize.STRING(255),
                    allowNull: true,
                    unique: true,
                },
                datanasc: {
                    type: Sequelize.STRING(255),
                    allowNull: true,
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
                },
            })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('usuarios');
    }
};