'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('enderecos',
            'estadosid', {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'estados',
                    key: 'id'
                }
            })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('enderecos', 'estadosid');
    }
};