const { QueryTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      `INSERT INTO "despesassaidas" ("id", "datapagto", "descricaosaida", "valortotalsaida", "despesasidentradas", "formaspagtosid") VALUES
      (1, '2023-05-14', 'Conta de Agua  05-2023  Fatura  001 - Nro docto bancario  3232131231',  50.56,  3,  3),
      (2, '2023-05-14', 'Aluguel  05-2023  Recibo N  001 - Nro docto bancario  32321 - Boleto Brasil',  500.00,  2,  3),
      (3, '2023-05-15', 'Recarga Celular empresa  05-2023 - Pagto Banco Bradesco docto  9880',  30.00,  8,  14),
      (4, '2023-05-15', 'Internet empresa  05-2023 - Boleto Bradesco docto  9885',  100.00,  4,  14),
      (5, '2023-05-15', 'IPVA Moto Honda Biz Placa HFD-3920 -  05-2023',  50.00,  6,  14),
      (6, '2023-05-15', '10 Canetas,  2 Pacotes de Papel Sulfite - Papelaria Belo Presents',  12.50,  9,  2),
      (7, '2023-05-22', 'Posto Shell mês  05-2023 CF  001 - docto  324242',  50.00,  1,  2);`,
      { type: QueryTypes.INSERT }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('despesassaidas', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('admin', null, {});
     */
}
};