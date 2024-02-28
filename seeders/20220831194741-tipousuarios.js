const { QueryTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      `INSERT INTO "tipousuarios" ("id", "tipousuario", "statusperfil", "createdAt", "updatedAt") VALUES
      (1, 'Administrador', 'Ativo', '2023-06-22  21:40:09', '2023-06-22  21:40:09'),
      (2, 'Supervisor', 'Ativo', '2023-06-22  21:43:35', '2023-06-22  21:43:35'),
      (3, 'Atendente', 'Ativo', '2023-06-22  21:47:59', '2023-06-22  21:47:59'),
      (4, 'Gerente', 'Ativo', '2023-06-22  21:48:11', '2023-06-22  21:48:11'),
      (5, 'Cliente', 'Inativo', '2023-06-22  21:48:19', '2023-06-22  21:48:19');`,
      { type: QueryTypes.INSERT }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tipousuarios', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('admin', null, {});
     */
}
};
