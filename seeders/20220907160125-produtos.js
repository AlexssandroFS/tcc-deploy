const { QueryTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      `INSERT INTO "produtos" ("id", "nomeprod", "qtdeminima", "createdAt", "updatedAt", "categoriasid") VALUES
      (1, 'Chocolate em Barra',  9, '2022-09-20  21:37:27', '2022-09-20  21:37:27',  8),
      (2, 'Bebida Refrigerante Lata Coca Cola',  13, '2022-09-20  21:37:27', '2022-09-20  21:37:27',  9),
      (3, 'Copo pequeno  300ml',  30, '2022-12-06  13:05:47', '2022-12-06  13:05:47',  26),
      (4, 'Balde de Açaí',  4, '2022-12-06  00:39:55', '2022-12-06  00:39:55',  23),
      (5, 'Pacote Colher Descartável pequena  50 unidades',  2, '2022-12-06  00:41:36', '2022-12-06  00:41:36',  25),
      (6, 'Caixa de Bis Chocolate',  3, '2022-12-06  00:42:45', '2022-12-06  00:42:45',  27),
      (7, 'Caixa de Bis chocolate branco',  3, '2022-12-06  00:43:36', '2022-12-06  00:43:36',  27),
      (8, 'Lata de Leite Ninho em Pó',  3, '2022-12-06  17:45:42', '2022-12-06  17:45:42',  28),
      (9, 'Lata de Leite Condensado',  3, '2022-12-15  03:38:22', '2022-12-15  03:38:22',  29),
      (10, 'Teste de Produto',  3, '2023-03-06  20:03:14', '2023-03-06  20:03:14',  13);`,
      { type: QueryTypes.INSERT }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('produtos', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('admin', null, {});
     */
}
};
