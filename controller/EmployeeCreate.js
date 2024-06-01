const bcrypt = require('bcryptjs');
const Employee = require('../model/Employee'); // Ensure correct path

const staticEmployees = [
  { username: 'user1', password: 'pass1', role: 'assembler' },
  { username: 'user2', password: 'pass2', role: 'assembler' },
  { username: 'user3', password: 'pass3', role: 'assembler' },
  { username: 'user4', password: 'pass4', role: 'assembler' },
  { username: 'user5', password: 'pass5', role: 'assembler' },
  { username: 'admin', password: 'admin', role: 'admin' },
];

async function createEmp() {
  for (const emp of staticEmployees) {
    try {
      const hashedPassword = await bcrypt.hash(emp.password, 10);
      await Employee.findOrCreate({
        where: { username: emp.username },
        defaults: {
          username: emp.username,
          password: hashedPassword,
          role: emp.role,
        },
      });
      console.log(`Employee ${emp.username} created successfully.`);
    } catch (error) {
      console.error(`Error creating employee ${emp.username}:`, error);
    }
  }
}

module.exports = createEmp;
