'use strict';
import { Model } from 'sequelize';

interface webhookAttributes {
  city_id: number;
  callback_url: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Webhook extends Model<webhookAttributes> implements webhookAttributes {
    city_id!: number;
    callback_url!: string;

    static associate(models: any) {}
  }

  Webhook.init(
    {
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      callback_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'Webhook',
    }
  );
  return Webhook;
};
