'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('pedidos',
            'formapagtosid', {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'formapagtos',
                    key: 'id'
                }
            });
        await queryInterface.addColumn('pedidos',
            'entregasid', {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'entregas',
                    key: 'id'
                }
            });
        await queryInterface.addColumn('pedidos',
            'cardapiosid', {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'cardapios',
                    key: 'id'
                }
            });

    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('pedidos','formapagtosid', 'entregasid', 'cardapiosid');

    }
};