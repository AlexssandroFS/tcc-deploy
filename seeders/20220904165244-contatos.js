const { QueryTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      `INSERT INTO "contatos" ("id", "email", "telefone", "createdAt", "updatedAt") VALUES
      (1, 'atenasacai@gmail.com', '1298187-6809', '2022-09-20  21:36:32', '2022-09-20  21:36:32'),
      (2, 'alex@gmail.com', '1297070-7070', '2022-09-20  21:36:32', '2022-09-20  21:36:32'),
      (3, 'alex@gmail.com', '1298187-6809', '2022-09-20  21:36:32', '2022-09-20  21:36:32'),
      (4, 'alexssss@gmail.com', '1298187-6809', '2022-09-20  21:36:32', '2022-09-20  21:36:32'),
      (5, 'alexssssssssssssssssss@gmail.com', '1298187-6809', '2022-10-07  17:56:56', '2022-10-07  17:56:56'),
      (6, 'alexssssssssssssssssss@gmail.com', '1298187-6809', '2022-10-07  18:10:00', '2022-10-07  18:10:00'),
      (7, 'alexssss@gmail.com', '1298187-6809', '2022-10-29  20:54:56', '2022-10-29  20:54:56'),
      (8, 'alexssandro.ferreira300@gmail.com', '1298187-6809', '2022-10-29  21:36:42', '2022-10-29  21:36:42'),
      (9, 'supervisor@gmail.com', '12997638877', '2022-11-08  12:00:39', '2022-11-08  12:00:39'),
      (10, 'atendente@gmail.com', '12997638199', '2022-11-08  12:03:20', '2022-11-08  12:03:20'),
      (11, 'sorveteriacrenata@crenata.com.br', '123961-2800', '2022-11-08  12:08:31', '2022-11-08  12:08:31'),
      (12, 'tadeu@gmail.com', '12323123', '2022-12-01  00:20:53', '2022-12-01  00:20:53'),
      (13, 'paula@gmail.com', '321313113', '2022-12-06  16:23:44', '2022-12-06  16:23:44'),
      (14, 'alexssandro.ferreira300@gmail.com', '1298312831', '2022-12-06  16:32:07', '2022-12-06  16:32:07'),
      (15, 'peterson@gmail.com', '12  9222-3232', '2023-06-13  17:38:01', '2023-06-13  17:38:01'),
      (16, 'pedro@gmail.com', '65  5433-3433', '2023-06-16  13:13:10', '2023-06-16  13:13:10'),
      (17, 'cliente@gmail.com', '12  9222-3232', '2023-06-22  17:44:52', '2023-06-22  17:44:52');`,
      { type: QueryTypes.INSERT }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('contatos', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('admin', null, {});
     */
}
};
