'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('entregas', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            dataentrega: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            valorentrega: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },
            tempoentrega: {
                allowNull: false,
                type: Sequelize.ENUM({
                    values: ['Selecionar', '5min', '15min', '30min', '45min', '1h', '1h15min', '1h30min', '2hs'],
                }),
                defaultValue: '5min'
            },
            formaentrega: {
                allowNull: false,
                type: Sequelize.ENUM({
                    values: ['Selecionar', 'Retirar', 'Motoboy'],
                }),
                defaultValue: 'Selecionar'

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

    },
    //belongsTo = 1 pertence a 1
    //belongsToMany = pertence a muitos
    //hasOne = tem 1
    //hasMany = tem muitos
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('entregas');

    }
};