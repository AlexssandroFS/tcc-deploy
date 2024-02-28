const { QueryTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      `INSERT INTO "despesasentradas" ("id", "descricao", "nrodocto", "datavalidade", "valortotal", "despesasid") VALUES
      (1, 'Posto Shell mês  05-2023', 'CF  001', '2023-05-11',  50.00,  15),
      (2, 'Aluguel mês  05-2023', 'Recibo N  001', '2023-05-11',  500.00,  3),
      (3, 'Conta de Agua mês  05-2023', 'Fatura  001 ', '2023-05-11',  50.56,  11),
      (4, 'Conta de Internet e TV a Cabo   05-2023', 'Fatura  001 ', '2023-06-10',  100.00,  14),
      (5, 'DPVAT Moto Honda Biz Placa HFD-3920 -  05-2023', 'Docto  0000333', '2023-05-19',  100.00,  17),
      (6, 'IPVA Moto Honda Biz Placa HFD-3920 -  05-2023', 'Docto  0000331', '2023-05-25',  50.00,  29),
      (7, 'Licenciamento Moto Honda Biz Placa HFD-3920 -  05-2023', 'Docto  0000332', '2023-05-26',  100.00,  33),
      (8, 'Recarga Celular Empresa  1298877-4433 -  05-2023', 'Fatura  001 -  05-2023', '2023-06-02',  30.00,  49),
      (9, '10 Canetas,   2 Pacotes de Papel Sulfite - Papelaria Belo Presents', 'Nota Fiscal  909', '2023-06-06',  12.50,  39);`,
      { type: QueryTypes.INSERT }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('despesasentradas', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('admin', null, {});
     */
}
};