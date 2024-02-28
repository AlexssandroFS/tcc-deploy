'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('despesas', {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                nomedespesa: {
                    type: Sequelize.STRING(255),
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
        await queryInterface.dropTable('despesas');

        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    }
};