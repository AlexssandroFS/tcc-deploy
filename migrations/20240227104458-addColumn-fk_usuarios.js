'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.addColumn('usuarios',
            'enderecosid', {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'enderecos',
                    key: 'id'
                }
            }),
            await queryInterface.addColumn('usuarios',
            'contatosid', {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'contatos',
                    key: 'id'
                }
            }),
            await queryInterface.addColumn('usuarios',
            'loginid', {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'login',
                    key: 'id'
                }
            })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('usuarios', 'enderecosid', 'loginid', 'contatosid');
    }
};