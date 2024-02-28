'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
     await queryInterface.addColumn('produtossaidas',
    'produtosidentradas', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'produtosentradas',
            key: 'id'
        }
    });
},

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('produtossaidas', 'produtosidentradas');

    }
};