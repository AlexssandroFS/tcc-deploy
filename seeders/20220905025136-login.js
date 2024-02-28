const { QueryTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      `INSERT INTO "login" ("id", "usuariologin", "senha", "statuslogin", "createdAt", "updatedAt", "tipousuarioid") VALUES
      (1, 'alexssandro', 'alex12345', 'Ativo', '2022-10-29  21:36:42', '2022-10-29  21:36:42',  1),
      (2, 'tadeu', '1234', 'Ativo', '2022-12-01  00:20:53', '2022-12-01  00:20:53',  2),
      (3, 'paula', '1234', 'Ativo', '2022-12-06  16:23:44', '2022-12-06  16:23:44',  3),
      (4, 'alexssandrofs', 'alex123', 'Ativo', '2022-12-06  16:32:07', '2022-12-06  16:32:07',  5),
      (5, 'peterson', '12345', 'Ativo', '2023-06-13  17:38:01', '2023-06-13  17:38:01',  1),
      (6, 'pedro', 'pedro', 'Ativo', '2023-06-19  15:05:36', '2023-06-19  15:05:36',  4),
      (7, 'testecliente', 'teste', 'Ativo', '2023-06-22  17:44:52', '2023-06-22  17:44:52',  5);`,
      { type: QueryTypes.INSERT }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('login', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('admin', null, {});
     */
}
};
