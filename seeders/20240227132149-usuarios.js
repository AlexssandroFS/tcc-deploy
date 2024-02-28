const { QueryTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      `INSERT INTO "usuarios" ("id", "nome", "cpf", "datanasc", "createdAt", "updatedAt", "enderecosid", "contatosid", "loginid") VALUES
      (1, 'Alexssandro F S', '221.411.656-89', '2000-05-29', '2022-10-29  21:36:42', '2022-10-29  21:36:42',  1,  8,  1),
      (2, 'Tadeu Fulano', '222.222.222-22', '2022-11-30', '2022-12-01  00:20:53', '2022-12-01  00:20:53',  2,  12,  2),
      (3, 'Paula Andrade', '999.000.999-00', '2022-12-06', '2022-12-06  16:23:44', '2022-12-06  16:23:44',  3,  13,  3),
      (4, 'Alexssandro Ferreira da Silva', '089.222.000.232-32', '2022-03-20', '2022-12-06  16:32:07', '2022-12-06  16:32:07',  4,  14,  4),
      (5, 'Peterson Calixto Forts', '343.434.343-43', '2023-06-13', '2023-06-13  17:38:01', '2023-06-13  17:38:01',  5,  15,  5),
      (6, 'Pedro Borges', '434.543.453-76', '2023-06-19', '2023-06-19  15:02:49', '2023-06-19  15:02:49',  6,  16,  6),
      (7, 'teste', '444.555.666-34', '2023-06-22', '2023-06-22  16:14:06', '2023-06-22  16:14:06',  7,  17,  7);`,
      { type: QueryTypes.INSERT }
    );
  },

 
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('admin', null, {});
     */
}
};
