'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('formapagtos', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            formapagto: {
                allowNull: true,
                type: Sequelize.STRING,
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
        await queryInterface.dropTable('formapagto');

    }
};