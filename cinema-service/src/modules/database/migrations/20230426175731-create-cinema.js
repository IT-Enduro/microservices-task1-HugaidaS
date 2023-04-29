'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cinemas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      cinemaUid: {
        type: Sequelize.UUID,
        unique: true,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addIndex('cinemas', ['cinemaUid'], {
      unique: true,
      name: 'udx_cinema_uid',
    });
    await queryInterface.bulkInsert('cinemas', [
      {
        id: 1,
        cinemaUid: '06cc4ba3-ee97-4d29-a814-c40588290d17',
        name: 'Кинотеатр Москва',
        address: 'Ереван, улица Хачатура Абовяна, 18',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.dropTable('cinemas');
    await queryInterface.removeIndex('cinemas', 'udx_cinema_uid');
  },
};
