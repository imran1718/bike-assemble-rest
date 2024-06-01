const { DataTypes,Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const sequelize = require('../Postgres/postgres');
class AssemblySession extends Model {}
AssemblySession.init({
    assemblyId:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    bikeType :{
        type: DataTypes.STRING,
    },
    startTime :{
        type: DataTypes.DATE,
    },
    endTime  :{
        type: DataTypes.DATE,
    }
},
{
    sequelize,
    modelName: 'AssemblySession',
    tableName: 'assemblySession',
  }
);
module.exports = AssemblySession;