'use strict';
const { QueryTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
    `INSERT INTO "fornecedores" ("id","ramoatuacao", "razaosocial", "nomefantasia", "cnpj", "enderecosid", "contatosid") VALUES
    (1,'alimentos, doces, açaí', 'Atenas', 'doces & cia', '33.333.333/3333-33',  1,  1),
    (2,'bebidas, sucos, refrigerantes', 'Maribeu', 'Maribeu descartáveis', '11.111.111/1111-11',  2,  2),
    (3,'material descartável', 'Palucia', 'balas & doces Palucia', '22.222.222/2222-22',  3,  3),
    (4,'refrigerante', 'RefriGel Ltda', 'RefriGel', '44.444.444/4444-44',  4,  4);`,
    { type: QueryTypes.INSERT }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('fornecedores', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('admin', null, {});
     */
}
};
