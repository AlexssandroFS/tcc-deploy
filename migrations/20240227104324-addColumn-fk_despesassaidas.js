'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
          await queryInterface.addColumn('despesassaidas',
                'despesasidentradas', {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'despesas',
                        key: 'id'
                    }
            })
   
    await queryInterface.addColumn('despesassaidas',
    'formaspagtosid', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'formapagtos',
            key: 'id'
        }
})
},
    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('despesassaidas.', 'despesasidentradas');
    }
};