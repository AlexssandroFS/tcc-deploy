'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('estados', {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                estados: {
                    allowNull: true,
                    type: Sequelize.STRING,
                    /*
                    allowNull: true,
                    type: Sequelize.ENUM({
                        values: ['Selecionar', 'Acre', 'Alagoas', 'Amapá', 'Amazonas',
                            'Bahia', 'Ceara', 'Distrito Federal', 'Espírito Santo', 'Goiás',
                            'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará',
                            'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro',
                            'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 'Roraima',
                            'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'
                        ],
                    }),
                    defaultValue: 'Selecionar',
                    */
                    
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
            /**
             * Add altering commands here.
             *
             * Example:
             * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
             */
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('estados');

        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    }
};