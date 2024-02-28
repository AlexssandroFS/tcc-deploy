'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
          await queryInterface.addColumn('login',
                'tipousuarioid', {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'tipousuarios',
                        key: 'id'
                    }
            })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('login', 'tipousuarioid');
    }
};