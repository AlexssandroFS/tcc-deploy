const { QueryTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
        `INSERT INTO "categorias" ("id", "nomecategoria", "descricao", "createdAt", "updatedAt") VALUES
      (1, 'Balas Diversas', 'balas diversos sabores', '2022-09-20  21:35:39', '2022-09-20  21:35:39'),
      (2, 'Sorvete na Casquinha', 'sorvete na casquinha', '2022-09-20  21:35:39', '2022-09-20  21:35:39'),
      (3, 'Sorvete na Cestinha', 'sorvete na cestinha', '2022-09-20  21:35:39', '2022-09-20  21:35:39'),
      (4, 'Sorvete no Copo', 'sorvete no copo', '2022-09-20  21:35:39', '2022-09-20  21:35:39'),
      (5, 'Picole de Frutas', 'sorvete', '2022-09-20  21:35:39', '2022-09-20  21:35:39'),
      (6, 'Picole ao Leite', 'picole ao leite', '2022-09-20  21:35:39', '2022-09-20  21:35:39'),
      (7, 'Picole Misto', 'sorvete', '2022-09-20  21:35:39', '2022-09-20  21:35:39'),
      (8, 'Chocolate em Barra', 'Barra de chocolate de  1kg', '2022-09-20  21:35:39', '2022-09-20  21:35:39'),
      (9, 'Bebida Refrigerante Lata', 'lata pequena', '2022-09-20  21:35:39', '2022-09-20  21:35:39'),
      (10, 'Bebida Refrigerante Garrafa', 'garrafa pequena', '2022-09-20  21:35:39', '2022-09-20  21:35:39'),
      (11, 'Bebida Suco Lata', 'lata pequena', '2022-09-20  21:35:39', '2022-09-20  21:35:39'),
      (12, 'Bebida Suco Garrafa', 'garrafa pequena', '2022-09-20  21:35:39', '2022-09-20  21:35:39'),
      (13, 'Agua Mineral com Gas garrafa', 'água mineral com gas garrafa', '2022-09-20  21:35:39', '2022-09-20  21:35:39'),
      (14, 'Agua Mineral sem Gas garrafa', 'água mineral sem gas garrafa', '2022-09-20  21:35:39', '2022-09-20  21:35:39'),
      (15, 'Copo Pequeno', 'copo pequeno', '2022-09-20  21:35:39', '2022-09-20  21:35:39'),
      (16, 'Copo Médio  500ml', 'Descartáveis - copo médio  500ml', '2022-09-20  21:35:39', '2022-09-20  21:35:39'),
      (17, 'Copo Grande  1000ml', 'Descartáveis - copo grande  1000ml', '2022-09-20  21:35:39', '2022-09-20  21:35:39'),
      (18, 'Copo Montado', 'copo montado', '2022-09-20  21:35:39', '2022-09-20  21:35:39'),
      (19, 'Copo Separado', 'copo separado', '2022-09-20  21:35:39', '2022-09-20  21:35:39'),
      (20, 'Conveniência', 'produtos diversos', '2022-09-25  23:29:47', '2022-09-25  23:29:47'),
      (21, 'Bebida Alcoólica', 'bebida Alcoólica', '2022-09-25  23:30:13', '2022-09-25  23:30:13'),
      (22, 'Doces Diversos', 'doces sortidos', '2022-09-26  02:13:43', '2022-09-26  02:13:43'),
      (23, 'Balde de Açaí', 'balde de açaí puro', '2022-10-30  01:27:55', '2022-10-30  01:27:55'),
      (24, 'Coberturas Liquidas Diversas', 'sabores: morango, chocolate, kiwi', '2022-11-01  13:52:10', '2022-11-01  13:52:10'),
      (25, 'Descartáveis - Colheres', 'colher descartável pequena', '2022-11-08  12:53:52', '2022-11-08  12:53:52'),
      (26, 'Copo pequeno  300ml', 'Descartáveis copo pequeno  300ml', '2022-11-15  02:54:44', '2022-11-15  02:54:44'),
      (27, 'Chocolate', 'bis, pacote, confete', '2022-12-05  19:49:32', '2022-12-05  19:49:32'),
      (28, 'Leite Ninho em Pó', 'Lata de Leite Ninho em Pó', '2022-12-06  17:39:33', '2022-12-06  17:39:33'),
      (29, 'Leite Condensado', 'Lata de Leite Condensado', '2022-12-06  18:32:14', '2022-12-06  18:32:14'),
      (30, 'Cobertura de Chocolate Quente ', 'Cobertura de Chocolate Quente para Açaí e Sorvete', '2022-12-06  18:32:57', '2022-12-06  18:32:57');`,
      { type: QueryTypes.INSERT }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categorias', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('admin', null, {});
     */
}
};
