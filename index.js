// import { empManager } from './util/node-persist';
const empManager = require('./util/node-persist');

// console.log(__dirname);
// console.log(__filename);

console.log('test'); // viewEmployeeDetail(1);
// console.log(empManager.getAllEmployees);
empManager.addEmployee(1, 'emp_name_1');

const empList = empManager.getAllEmployees();
console.log(empList);

// empList.forEach(element => {
//   empManager.viewEmployeeDetail(element.empId);
// });
