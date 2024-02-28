'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('produtosentradas', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            marca: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            doctofiscal: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            datacompra: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            datafabricacao: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            datavalidade: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            statusvalidade: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            qtdecompra: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            valorunit: {
                type: Sequelize.DOUBLE(10,  2),
                allowNull: false,
            },
            valortotal: {
                type: Sequelize.DOUBLE(10,  2),
                allowNull: false,
            },
            dataatual: {
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
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('produtosentradas');
    }
};