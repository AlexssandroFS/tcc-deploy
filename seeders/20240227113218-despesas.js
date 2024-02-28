const { QueryTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      `INSERT INTO "despesas" ("id", "nomedespesa") VALUES
      (1, '13º Salários'),
      (2, 'Aparelho de Eletrônico'),
      (3, 'Aluguel'),
      (4, 'Aquisição de Eletrodoméstico'),
      (5, 'Aquisição de Eletroportáteis'),
      (6, 'Aquisição de Equipamento de Informática'),
      (7, 'Aquisição de Veículo'),
      (8, 'Aquisição de Imovel'),
      (9, 'Cheques Trocados/Recebidos'),
      (10, 'Cheques Descontados'),
      (11, 'Conta de Agua'),
      (12, 'Conta de Energia Elétrica'),
      (13, 'Conta de Telefone'),
      (14, 'Conta de Internet/Tv Cabo'),
      (15, 'Combustivel'),
      (16, 'Compra de Softwares'),
      (17, 'DPVAT Veicular'),
      (18, 'Emprestimo Bancário'),
      (19, 'Frete'),
      (20, 'Fatura de Cartão de Crédito'),
      (21, 'Financimento de Imovel'),
      (22, 'Financiamento de Veículo'),
      (23, 'Financiamento de Equipamento Eletroportáteis '),
      (24, 'Financiamento de Equipamento Eletrodoméstico'),
      (25, 'Financiamento de Equipamento de Informática'),
      (26, 'Folha de Pagamento'),
      (27, 'FGTS'),
      (28, 'Fornecedores'),
      (29, 'IPVA Veicular'),
      (30, 'INSS a Recolher'),
      (31, 'Impostos'),
      (32, 'Juros'),
      (33, 'Licenciamento Veicular'),
      (34, 'Manutenção de Eletroportáteis '),
      (35, 'Manutenção de Eletrodoméstico'),
      (36, 'Manutenção de Veículo'),
      (37, 'Manutenção de Imovel'),
      (38, 'Manutenção de Equipamento de Informática'),
      (39, 'Material de Consumo'),
      (40, 'Multa'),
      (41, 'Parcelamento de Equipamento Eletroportáteis '),
      (42, 'Parcelamento de Equipamento Eletrodoméstico'),
      (43, 'Parcelamento de Equipamento de Informática'),
      (44, 'Publicidade'),
      (45, 'Recebimento em Dinheiro'),
      (46, 'Recebimento Cartão de Crédito'),
      (47, 'Recebimento Cartão de Débito'),
      (48, 'Recebimento Pix'),
      (49, 'Recarga de Celular'),
      (50, 'Saldo Anterior'),
      (51, 'Saldo Atual'),
      (52, 'Serviços de Contabilidade'),
      (53, 'Seguro Residencial'),
      (54, 'Seguro Veicular'),
      (55, 'Taxas'),
      (56, 'Vale Transporte'),
      (57, 'Outros');`,
      { type: QueryTypes.INSERT }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('despesas', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('admin', null, {});
     */
}
};