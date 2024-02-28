'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('produtosentradas',
            'fornecedoresid', {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'fornecedores',
                    key: 'id'
                }
            });

    await queryInterface.addColumn('produtosentradas',
    'produtosid', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'produtos',
            key: 'id'
        }
    });
},

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('produtosentradas', 'fornecedoresid', 'produtosid');

    }
};