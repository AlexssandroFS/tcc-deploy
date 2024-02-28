const { QueryTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      `INSERT INTO "produtosentradas" ("id", "marca", "doctofiscal", "datacompra", "datafabricacao", "datavalidade", "statusvalidade", "qtdecompra", "valorunit", "valortotal", "createdAt", "updatedAt", "dataatual", "produtosid", "fornecedoresid") VALUES
      (1, 'Nestle', 'NF  001', '2022-12-15', '2023-10-30', '2023-11-30', 'Produto com validade em dia! Vencerá em  24 dia(s).',  10,  5.00,  50.00, '2022-09-20  21:37:27', '2023-11-06  18:35:37', '2023-11-06',  1,  1),
      (2, 'Coca-Cola', 'NF  002', '2022-12-15', '2022-12-15', '2023-11-27', 'Produto com validade em dia! Vencerá em  21 dia(s).',  60,  2.00,  120.00, '2022-09-20  21:37:27', '2023-11-06  22:45:01', '2023-11-06',  2,  4),
      (3, 'Copoplastil', 'NF  001', '2022-12-05', '2023-02-27', '2023-03-31', 'Urgente: Produto validade VENCIDA a  220 dia(s).',  8,  2.50,  20.00, '2022-12-06  13:05:47', '2023-11-06  22:45:39', '2023-11-06',  3,  2),
      (4, 'Top Açaí', 'NF  007', '2022-12-05', '2022-12-05', '2023-01-06', 'Produto com validade em dia! Vencerá em  32 dia(s).',  3,  100.55,  301.65, '2022-12-06  00:39:55', '2022-12-06  00:39:55', '2023-11-03',  4,  4),
      (5, 'Plastic', 'NF  001', '2022-12-05', '2022-12-05', '2023-04-05', 'Produto com validade em dia! Vencerá em  121 dia(s).',  4,  3.00,  12.00, '2022-12-06  00:41:36', '2022-12-06  00:41:36', '2023-11-03',  5,  2),
      (6, 'Nestle', 'NF  008', '2022-12-05', '2022-12-05', '2022-12-29', 'Produto com validade em dia! Vencerá em  24 dia(s).',  10,  1.50,  15.00, '2022-12-06  00:42:45', '2022-12-06  00:42:45', '2023-11-03',  6,  3),
      (7, 'Nestle', 'NF  008', '2022-12-05', '2022-12-05', '2022-12-06', 'Atenção: Produto com validade comprometida! Vencerá em  1 dia(s)!',  10,  1.50,  15.00, '2022-12-06  00:43:36', '2022-12-06  00:43:36', '2023-11-03',  7,  3),
      (8, 'Nestle', 'NF  001', '2022-12-06', '2022-12-06', '2022-12-15', 'Cuidado! Produto vence hoje!',  10,  4.50,  45.00, '2022-12-06  17:45:42', '2022-12-06  17:45:42', '2023-11-03',  8,  1),
      (9, 'Nestle', 'NF  001', '2022-12-15', '2022-12-15', '2023-05-31', 'Produto com validade em dia! Vencerá em  167 dia(s).',  5,  3.50,  17.50, '2022-12-15  03:38:22', '2022-12-15  03:38:22', '2023-11-03',  9,  1),
      (10, 'Nestle', 'NF  002', '2023-03-28', '2023-03-28', '2023-05-06', 'Produto com validade em dia! Vencerá em  40 dia(s).',  2,  3.50,  7.00, '2023-04-01  22:08:02', '2023-04-01  22:08:02', '2023-11-03',  9,  1);`,
      { type: QueryTypes.INSERT }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('produtosentradas', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('admin', null, {});
     */
}
};
