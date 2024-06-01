const { Op } = require('sequelize');
const property = require('../model/Employee');

async function getUserByusername(username) {
    try {
      const searchResults = await property.findAll({
        attributes: ['username','employeeId','role'],   
        where: {
            username: {
            [Op.iLike]: `%${username}%`,
          },
        },
      });
      return searchResults;
    } catch (error) {
      console.error('Error occurred during search:', error);
      throw error;
    }
  }

  module.exports = {getUserByusername};