var express = require('express');




var router = express.Router();
const employeeController = require('../controller/EmployeeController');
const metricController = require('../controller/MetricController');
const loginLimiter = require('../middleware/loginlimit');

router.post('/login', employeeController.login);
router.post('/signup', employeeController.signup);

router.post('/start/assembly',loginLimiter, employeeController.startAssembly);
router.post('/end/assembly', employeeController.endAssembly);
router.get('/getUser/:username', employeeController.getUser);
router.post('/metrics/bikes-assembled', metricController.getBikeAssembled);
router.post('/metrics/employee-production', metricController.getEmployeeProduction);

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
 module.exports = router;
