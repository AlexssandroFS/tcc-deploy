'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('fornecedores', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            razaosocial: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            nomefantasia: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            cnpj: {
                type: Sequelize.STRING(25),
                allowNull: false,
            },
            ramoatuacao: {
                type: Sequelize.STRING(255),
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
        await queryInterface.dropTable('fornecedores');

    }
};