'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('categorias', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            nomecategoria: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            descricao: {
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
        await queryInterface.dropTable('categorias');

    }
};