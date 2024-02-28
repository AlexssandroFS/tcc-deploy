'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
          await queryInterface.addColumn('despesasentradas',
                'despesasid', {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'despesas',
                        key: 'id'
                    }
            })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('despesasentradas', 'despesasid');
    }
};