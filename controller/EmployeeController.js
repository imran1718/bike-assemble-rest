const Employee = require('../model/Employee');
const AssemblySession = require('../model/AssemblySession');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const EmpRepo = require('../repo/EmployeeRepository');


// const employees = [
//     { id: 1, username: 'employee1', password: bcrypt.hashSync('password1', 8) },
//     { id: 2, username: 'employee2', password: bcrypt.hashSync('password2', 8) },
//     { id: 3, username: 'employee3', password: bcrypt.hashSync('password3', 8) },
//     { id: 4, username: 'employee4', password: bcrypt.hashSync('password4', 8) },
//     { id: 5, username: 'employee5', password: bcrypt.hashSync('password5', 8) },
//   ];
  const secret = '7d7e31362cc46902e161bf66d88e0f74f8f60e5d28bd24070427784f9c015e56'
  async function signup(req, res) {
    try {
  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(req.body.password, salt);
  let user = await Employee.create({
    username: req.body.username,
    password: secPass,
  });
  res.json({ user });
}catch (error) {
  console.error('Error occurred during search:', error);
  return res.status(500).json({ error: 'Internal server error' });
}
  }
  async function getUser(req, res) {
    try {
      const username  = req.params.username;
      console.log("Received login request:", { username });

      // Find employee by username
      const employee = await EmpRepo.getUserByusername(username);
      console.log(employee,"======");
      if (!employee) {
          console.log("User not found for username:", username);
          return res.status(404).send({ message: 'User not found.' });
      }

        res.status(200).send({ employee });
    } catch (error) {
      console.error('Error occurred during search:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
async function login(req, res) {
    try {
      const { username, password } = req.body;
      console.log("Received login request:", { username, password });

      // Find employee by username
      const employee = await Employee.findOne({ where: { username } });
      if (!employee) {
          console.log("User not found for username:", username);
          return res.status(404).send({ message: 'User not found.' });
      }

      // Compare passwords
      console.log("Comparing passwords:", { enteredPassword: password, storedPassword: employee.password });
      const validPass = await bcrypt.compare(password, employee.password);
      if (!validPass) {
          console.log("Invalid password for user:", username);
          return res.status(400).send({ message: 'Invalid password' });
      }

      // Password is valid, proceed with login
      console.log("User logged in successfully:", username);

        const token = jwt.sign({ id: employee.id }, 'secret', { expiresIn: 86400 }); // 24 hours
        // const token = jwt.sign({ id: employee.id }, process.env.JWT_SECRET || 'default-secret-key', { expiresIn: 86400 }); // 24 hours
        res.status(200).send({ token });
    } catch (error) {
      console.error('Error occurred during search:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  async function startAssembly(req, res) {
    try {
      const session = await AssemblySession.create({
        employeeId: req.body.employeeId,
        bikeType: req.body.bikeType,
        startTime: new Date()
      });
       
        res.status(200).send(session);
    } catch (error) {
      console.error('Error occurred during search:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  async function endAssembly(req, res) {
    try {
      const session = await AssemblySession.findOne({ where: { employeeId: req.body.employeeId, endTime: null } });
       if (!session) return res.status(400).send('No active assembly session found');
       session.endTime = new Date();
       await session.save();
       res.send(session);
    } catch (error) {
      console.error('Error occurred during search:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  

module.exports = { signup,getUser,login,startAssembly,endAssembly};  

