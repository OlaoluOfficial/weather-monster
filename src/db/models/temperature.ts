'use strict';
import { Model } from 'sequelize';

interface tempAttributes {
  max: number;
  min: number;
  timestamp: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Temperature extends Model<tempAttributes> implements tempAttributes {
    max!: number;
    min!: number;
    timestamp!: number;

    static associate(models: any) {}
  }
  Temperature.init(
    {
      max: {
        type: DataTypes.DECIMAL(),
        allowNull: false,
      },
      min: {
        type: DataTypes.DECIMAL(),
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.BIGINT(),
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'Temperature',
    }
  );
  return Temperature;
};
