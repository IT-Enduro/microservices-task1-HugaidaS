'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ticketUid: {
        type: Sequelize.UUID,
        unique: true,
        allowNull: false,
      },
      filmUid: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      sessionUid: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      user_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { len: [2, 80] },
      },
      row: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      seat: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { isIn: [['BOOKED', 'CANCELED']] },
      },
      date: { type: Sequelize.DATE, allowNull: false },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addIndex('tickets', ['ticketUid'], {
      unique: true,
      name: 'udx_tickets_ticket_uid',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('tickets');
    await queryInterface.removeIndex('tickets', 'udx_tickets_ticket_uid');
  },
};
