const { QueryTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
        `INSERT INTO "enderecos" ("id", "endereco", "nro","complemento","bairro","cidade","estadosid","cep") VALUES
        (1,'Rua C', '99', 'casa', 'Centro', 'Jacareí',  25, '12.360-460'),
        (2,'Rua C', '99', 'casa', 'Centro', 'Jacareí',  15, '12.360-460'),
        (3,'Rua C', '99', 'casa', 'Centro', 'Jacareí',  13, '12.360-460'),
        (4,'Rua C', '99', 'casa', 'Centro', 'Jacareí',  12, '12.360-460'),
        (5,'Rua C', '99', 'casa', 'Centro', 'Jacareí',  10, '12.360-460'),
        (6,'Rua C', '99', 'casa', 'Centro', 'Jacareí',  9, '12.360-460'),
        (7,'Rua C', '99', 'casa', 'Centro', 'Jacareí',  5, '12.360-460');
        `,
      { type: QueryTypes.INSERT }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('enderecos', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('admin', null, {});
     */
}
};
