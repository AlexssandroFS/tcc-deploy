const { QueryTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
        `INSERT INTO "entregas" ("id", "dataentrega", "valorentrega", "tempoentrega", "formaentrega", "createdAt", "updatedAt") VALUES
(1, '2022-09-20  21:38:31',   5.00, '15min', 'Motoboy', '2022-09-20   21:38:31', '2022-09-20   21:38:31'),
(2, '2022-09-20  21:38:31',   5.00, '15min', 'Retirar', '2022-09-20   21:38:31', '2022-09-20   21:38:31'),
(3, '2022-09-20  21:38:31',   5.00, '15min', 'Motoboy', '2022-09-20   21:38:31', '2022-09-20   21:38:31');`,
      { type: QueryTypes.INSERT }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('entregas', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('admin', null, {});
     */
}
};
