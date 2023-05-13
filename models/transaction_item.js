'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Item, { foreignKey: "itemId", targetKey: "id" })

      // define association here
    }
  }
  Transaction_item.init({
    itemId: DataTypes.INTEGER,
    transactionId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Transaction_item',
  });
  return Transaction_item;
};