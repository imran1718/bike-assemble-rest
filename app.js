const express = require('express');
const app = express();
const sequelize = require('./Postgres/postgres');
const cors = require('cors');
const bodyParser = require('body-parser'); // Ensure this is required

const PORT = 3000;
const Employee = require('./model/Employee');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const createEmp = require('./controller/EmployeeCreate')
app.get('/', (req, res) => {
  res.status(200).send("Welcome to Node Server");
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Setting single route
app.all('/user', (req, res) => {
  console.log("User Page Called");
  res.send("Welcome to User");
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
async function startServer() {
  try {
    await sequelize.authenticate(); 
    console.log('Database connection has been established successfully.');

    await sequelize.sync().then(async () => {
      // Check if there are any employees in the database
      const employeeCount = await sequelize.models.Employee.count();
      if (employeeCount === 0) {
        // Seed static employees if the database is empty
        await createEmp();
      }
    });

    console.log('Models synchronized with the database.');

    app.listen(PORT, (error) => {
      if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT);
      else
        console.log("Error occurred, server can't start", error);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();
module.exports = app;
