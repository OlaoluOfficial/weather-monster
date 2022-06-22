'use strict';
import { Model } from 'sequelize';

interface cityAttributes {
  name: string;
  latitude: string;
  longitude: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class City extends Model<cityAttributes> implements cityAttributes {
    name!: string;
    latitude!: string;
    longitude!: string;

    static associate(models: any) {
      City.hasMany(models.Temperature, {
        sourceKey: 'id',
        foreignKey: 'city_id',
        as: 'Temperatures',
      });

      City.hasMany(models.Webhook, {
        sourceKey: 'id',
        foreignKey: 'city_id',
        as: 'Webhooks',
      });
    }
  }

  City.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'City',
    }
  );
  return City;
};


