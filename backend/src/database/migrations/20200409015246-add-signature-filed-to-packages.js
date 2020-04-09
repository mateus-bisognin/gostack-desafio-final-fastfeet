module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('packages', 'signature_id', {
      type: Sequelize.INTEGER,
      references: { model: 'files', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('packages', 'signature_id');
  },
};
