'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('enderecos', {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                endereco: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                nro: {
                    type: Sequelize.STRING(10),
                    allowNull: false,
                },
                complemento: {
                    type: Sequelize.STRING(150),
                    allowNull: false,
                },
                bairro: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                cidade: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },

                /*
                sigla: {
                    type: Sequelize.ENUM,
                    values: ['AC', 'AL', 'AP', 'AM',
                        'BA', 'CE', 'DF', 'ES', 'GO',
                        'MA', 'MT', 'MS', 'MG', 'PA',
                        'PB', 'PR', 'PE', 'PI', 'RJ',
                        'RN', 'RS', 'RO', 'RR', 'SC',
                        'SP', 'SE', 'TO'
                    ],
                    defaultValue: 'SP',
                    allowNull: false

                },
                */
               /*
                estados: {
                    type: Sequelize.ENUM,
                    values: ['Acre', 'Alagoas', 'Amapá', 'Amazonas',
                        'Bahia', 'Ceara', 'Distrito Federal', 'Espírito Santo', 'Goiás',
                        'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará',
                        'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro',
                        'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 'Roraima', 
                        'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'
                    ],
                    defaultValue: 'SP',
                    allowNull: false

                },
                */

                cep: {
                    type: Sequelize.STRING(25),
                    allowNull: false,
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
        await queryInterface.dropTable('enderecos');

        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    }
};