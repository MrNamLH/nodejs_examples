// import storage from 'node-persist';
var storage = require('node-persist');

storage.init({
  dir: '../employees',

  stringify: JSON.stringify,

  parse: JSON.parse,

  encoding: 'utf8',

  logging: false, // can also be custom logging function

  ttl: false, // ttl* [NEW], can be true for 24h default or a number in MILLISECONDS or a valid Javascript Date object

  expiredInterval: 2 * 60 * 1000, // every 2 minutes the process will clean-up the expired cache

  // in some cases, you (or some other service) might add non-valid storage files to your
  // storage dir, i.e. Google Drive, make this true if you'd like to ignore these files and not throw an error
  forgiveParseErrors: false
});

async function getAllEmployees() {
  let allEmployees = await storage.getItem('employees');

  if (typeof allEmployees === 'undefined') {
    return [];
  }

  return allEmployees;
}

getEmployeeById = empId => {
  let empList = getAllEmployees();

  empList.forEach(employee => {
    if (employee.empId === empId) {
      return employee;
    }
  });

  return null;
};

async function addEmployee(empId, empName) {
  let allEmployees = await getAllEmployees();

  allEmployees.push({
    empId: empId,
    empName: empName
  });

  await storage.setItem('employees', allEmployees);

  //console.log(await storage.getItem('employees'));
}

viewEmployeeDetail = empId => {
  let empList = getAllEmployees();

  empList.forEach(employee => {
    if (employee.empId === empId) {
      console.log(
        `employee_id: ${employee.empId}; employee_name = ${employee.empName}`
      );
    }
  });
};

module.exports = {
  getAllEmployees,
  addEmployee,
  viewEmployeeDetail
};
