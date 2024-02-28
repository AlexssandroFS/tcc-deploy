'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('pedidos', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            qtde: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            valorunit: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },
            totalparcial: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },
            desconto: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },
            valorfinal: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },
            datapedido: {
              type: Sequelize.DATE,
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

        });
    },
    //belongsTo = 1 pertence a 1
    //belongsToMany = pertence a muitos
    //hasOne = tem 1
    //hasMany = tem muitos
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('pedidos');
    }
};