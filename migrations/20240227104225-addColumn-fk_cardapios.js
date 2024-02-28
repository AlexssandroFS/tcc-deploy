'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('cardapios',
            'categoriasid', {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'categorias',
                    key: 'id'
                }
            });
        /*await queryInterface.addColumn('cardapios',
            'produtosid', {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'produtos',
                    key: 'id'
                }
            });*/
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('cardapios', 'categoriasid');

    }
};