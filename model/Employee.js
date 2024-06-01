const { DataTypes,Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const sequelize = require('../Postgres/postgres');
const AssemblySession = require('./AssemblySession');
class Employee extends Model {}
Employee.init({
    employeeId:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    username:{
        type: DataTypes.STRING,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
    },
    role:{
        type: DataTypes.STRING,
    }
},
{
    sequelize,
    modelName: 'Employee',
    tableName: 'employee',
  }
);
Employee.hasMany(AssemblySession, { foreignKey: 'employeeId',as:'Assemblies' });

module.exports = Employee;