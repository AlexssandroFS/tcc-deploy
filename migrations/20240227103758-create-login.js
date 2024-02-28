'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('login', {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                usuariologin: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                senha: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                /* roles: {
                     type: Sequelize.ARRAY(Sequelize.ENUM({
                         values: ['user', 'setter', 'admin']
                     })),
                 */
                statuslogin: {
                    allowNull: true,
                    type: Sequelize.ENUM({
                        values: ['Ativo', 'Inativo'],
                    }),
                    defaultValue: 'Ativo'
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
        await queryInterface.dropTable('login');

        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    }
};