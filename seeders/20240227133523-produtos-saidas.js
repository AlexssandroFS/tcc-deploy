const { QueryTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      `INSERT INTO "produtossaidas" ("id", "qtdsaida", "valorunitariosaida", "valortotalsaida", "datasaida", "createdAt", "updatedAt", "produtosidentradas") VALUES
      (1,  3,  3.50,  10.50, '2022-12-07', '2022-12-07  10:17:39', '2022-12-07  10:17:39',  9),
      (2,  6,  1.50,  9.00, '2023-02-14', '2023-02-14  12:59:59', '2023-02-14  12:59:59',  6),
      (3,  2,  100.50,  201.00, '2023-03-14', '2023-03-14  13:23:57', '2023-03-14  13:23:57',  4),
      (4,  3,  2.00,  6.00, '2023-03-14', '2023-03-14  13:47:54', '2023-03-14  13:47:54',  2),
      (5,  1,  3.50,  3.50, '2023-04-05', '2023-04-01  20:16:33', '2023-04-01  20:16:33',  9),
      (6,  1,  1.50,  1.50, '2023-03-28', '2023-04-01  20:41:07', '2023-04-01  20:41:07',  6);`,
      { type: QueryTypes.INSERT }
    );
  },

 
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('produtossaidas', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('admin', null, {});
     */
}
};
