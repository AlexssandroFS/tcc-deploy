'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('fornecedores',
                'contatosid', {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'contatos',
                        key: 'id'
                    }
                }),
            await queryInterface.addColumn('fornecedores',
                'enderecosid', {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'enderecos',
                        key: 'id'
                    }
                })

    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('fornecedores', 'contatosid', 'enderecosid');

    }
};