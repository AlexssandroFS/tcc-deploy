const { QueryTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      `INSERT INTO "formapagtos" ("id", "formapagto", "createdAt", "updatedAt") VALUES
      (1, 'Cartão Débito Visa', '2022-09-20  21:58:00', '2022-09-20  21:58:00'),
      (2, 'Cartão Crédito Visa', '2022-09-20  21:58:00', '2022-09-20  21:58:00'),
      (3, 'Dinheiro', '2022-09-20  21:58:00', '2022-09-20  21:58:00'),
      (4, 'Pix', '2022-09-20  21:58:00', '2022-09-20  21:58:00'),
      (5, 'Transferência Bancária', '2022-09-20  21:58:00', '2022-09-20  21:58:00'),
      (6, 'Cartão Crédito Mastercard', '2022-09-23  22:50:47', '2022-09-23  22:50:47'),
      (7, 'Cartão Débito Mastercard', '2022-09-24  00:55:44', '2022-09-24  00:55:44'),
      (8, 'Cartão Crédito Elo', '2022-09-26  02:16:14', '2022-09-26  02:16:14'),
      (9, 'Cartão Débito Elo', '2022-09-26  02:40:33', '2022-09-26  02:40:33'),
      (10, 'American Express Crédito', '2022-09-26  02:50:27', '2022-09-26  02:50:27'),
      (11, 'American Express Débito', '2022-09-26  02:54:03', '2022-09-26  02:54:03'),
      (12, 'Dinners Club Débito', '2022-09-26  02:57:20', '2022-09-26  02:57:20'),
      (13, 'Dinners Club Crédito', '2022-09-26  02:57:36', '2022-09-26  02:57:36'),
      (14, 'Débito em Conta Bancária', '2023-05-28  00:41:27', '2023-05-28  00:41:27');`,
      { type: QueryTypes.INSERT }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('formapagtos', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('admin', null, {});
     */
}
};

