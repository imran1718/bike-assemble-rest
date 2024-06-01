const Employee = require('../model/Employee');
const AssemblySession = require('../model/AssemblySession');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const EmpRepo = require('../repo/EmployeeRepository');
const { Op } = require('sequelize');

async function getBikeAssembled(req, res) {
    try {
        const { from, to } = req.body;
        const sessions = await AssemblySession.findAll({
          where: {
            endTime: {
              [Op.between]: [new Date(from), new Date(to)],
            },
          },
        });
        res.send({ count: sessions.length });
      
    } catch (error) {
      console.error('Error occurred during search:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  async function getEmployeeProduction(req, res) {
    try {
        const { date } = req.body;
        const sessions = await AssemblySession.findAll({
          where: {
            start_time: {
              [Op.gte]: new Date(new Date(date).setHours(0, 0, 0)),
              [Op.lte]: new Date(new Date(date).setHours(23, 59, 59)),
            },
          },
          include: [{ model: Employee, attributes: ['username'] }],
        });
      
        const production = sessions.reduce((acc, session) => {
          acc[session.employee.username] = (acc[session.employee.username] || 0) + 1;
          return acc;
        }, {});
      
        res.send(production);
      
    } catch (error) {
      console.error('Error occurred during search:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  module.exports = { getBikeAssembled,getEmployeeProduction};  
