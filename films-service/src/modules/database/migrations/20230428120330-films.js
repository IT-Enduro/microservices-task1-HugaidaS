'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('films', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      filmUid: {
        type: Sequelize.UUID,
        unique: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rating: {
        type: Sequelize.DECIMAL(8, 1),
        allowNull: false,
        validate: {
          min: 0,
          max: 10,
        },
        get() {
          const value = this.getDataValue('rating');
          return parseFloat(value);
        },
      },
      director: {
        type: Sequelize.STRING,
      },
      producer: {
        type: Sequelize.STRING,
      },
      genre: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.addIndex('films', ['filmUid'], {
      unique: true,
      name: 'udx_film_uid',
    });
    await queryInterface.bulkInsert('films', [
      {
        id: 1,
        filmUid: '049161bb-badd-4fa8-9d90-87c9a82b0668',
        name: 'Terminator 2 Judgment day',
        rating: 8.6,
        director: 'James Cameron',
        producer: 'James Cameron',
        genre: 'Sci-Fi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('films');
    await queryInterface.removeIndex('films', 'udx_film_uid');
  },
};
