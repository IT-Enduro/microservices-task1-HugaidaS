'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sessions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cinema_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        foreignKey: true,
      },
      session_uid: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      filmUid: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      total_seats: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      booked_seats: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
          max: Sequelize.col('total_seats'),
          errorMessage: 'Booked seats cannot be more than total seats',
        },
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
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
    await queryInterface.addConstraint('sessions', {
      fields: ['cinema_id'],
      type: 'foreign key',
      name: 'fk_cinema_id',
      references: {
        table: 'cinemas',
        field: 'id',
      },
    });
    await queryInterface.addIndex('sessions', ['session_uid'], {
      unique: true,
      name: 'udx_film_session_session_uid',
    });
    await queryInterface.bulkInsert('sessions', [
      {
        id: 1,
        cinema_id: 1,
        filmUid: '049161bb-badd-4fa8-9d90-87c9a82b0668',
        session_uid: '119161bb-badd-4fa8-9d90-87c9a82b0611',
        date: '2024-01-01T08:00:00',
        total_seats: 5000,
        booked_seats: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.removeIndex(
      'sessions',
      'udx_film_session_session_uid',
    );
    await queryInterface.removeConstraint('sessions', 'fk_cinema_id');
    await queryInterface.dropTable('sessions');
  },
};
