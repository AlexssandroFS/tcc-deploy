'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('produtos',
            'categoriasid', {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'categorias',
                    key: 'id'
                }
            })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('produtos', 'categoriasid');

    }
};