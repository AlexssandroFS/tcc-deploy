//npx sequelize-cli db:seed:all
const { QueryTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
        `INSERT INTO "estados" ("id", "estados", "createdAt", "updatedAt") VALUES
      (1, 'Acre', '2022-09-20 21:35:32', '2022-09-20 21:35:32'),
      (2, 'Alagoas', '2022-09-20 21:35:32', '2022-09-20 21:35:32'),
      (3, 'Amapá', '2022-09-20 21:35:32', '2022-09-20 21:35:32'),
      (4, 'Amazonas', '2022-09-20 21:35:32', '2022-09-20 21:35:32'),
      (5, 'Bahia', '2022-09-20 21:35:32', '2022-09-20 21:35:32'),
      (6, 'Ceará', '2022-09-20 21:35:32', '2022-09-20 21:35:32'),
      (7, 'Distrito Federal', '2022-09-20 21:35:32', '2022-09-20 21:35:32'),
      (8, 'Espírito Santo', '2022-09-20 21:35:32', '2022-09-20 21:35:32'),
      (9, 'Goiás', '2022-09-20 21:35:32', '2022-09-20 21:35:32'),
      (10, 'Maranhão', '2022-09-20 21:35:32', '2022-09-20 21:35:32'),
      (11, 'Mato Grosso', '2022-09-20 21:35:32', '2022-09-20 21:35:32'),
      (12, 'Mato Grosso do Sul', '2022-09-20 21:35:32', '2022-09-20 21:35:32'),
      (13, 'Minas Gerais', '2022-09-20 21:35:32', '2022-09-20 21:35:32'),
      (14, 'Pará', '2022-09-20 21:35:32', '2022-09-20 21:35:32'),
      (15, 'Paraíba', '2022-09-20 21:35:32', '2022-09-20 21:35:32'),
      (16, 'Paraná', '2022-09-20 21:35:32', '2022-09-20 21:35:32'),
      (17, 'Pernambuco', '2022-09-20 21:35:32', '2022-09-20 21:35:32'),
      (18, 'Piauí', '2022-09-20 21:35:32', '2022-09-20 21:35:32'),
      (19, 'Rio de Janeiro', '2022-09-20 21:35:32', '2022-09-20 21:35:32'),
      (20, 'Rio Grande do Norte', '2022-09-20 21:35:32', '2022-09-20 21:35:32'),
      (21, 'Rio Grande do Sul', '2022-09-20 21:35:32', '2022-09-20 21:35:32'),
      (22, 'Rondônia', '2022-09-20 21:35:32', '2022-09-20 21:35:32'),
      (23, 'Roraima', '2022-09-20 21:35:32', '2022-09-20 21:35:32'),
      (24, 'Santa Catarina', '2022-09-20 21:35:32', '2022-09-20 21:35:32'),
      (25, 'São Paulo', '2022-09-20 21:35:32', '2022-09-20 21:35:32'),
      (26, 'Sergipe', '2022-09-20 21:35:32', '2022-09-20 21:35:32'),
      (27, 'Tocantins', '2022-09-20 21:35:32', '2022-09-20 21:35:32'); `,
      { type: QueryTypes.INSERT }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('estados', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('admin', null, {});
     */
}
};


