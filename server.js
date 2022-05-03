// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
// Import and require mysql2
const mysql = require('mysql2');
var inquirer = require('inquirer');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',

        user: 'root',

        password: '',
        database: 'courses_db'
    },
    console.log(`Connected to the courses_db database.`)
);

const inquirerLoop = function () {
inquirer
    .prompt({
        type: "list",
        message: "What would you like to do?",
        name: "startTask",
        choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update employee role"]
    })
    .then((answers) => {
        if (answers.startTask == "View all departments") {
            viewDep()
        }
        if (answers.startTask == "View all roles") {
            viewRoles()
        }
        if (answers.startTask == "View all employees") {
            viewEmp()
        }
        if (answers.startTask == "Add a department") {
            addDep()
        }
        if (answers.startTask == "Add a role") {
            addRole()
        }
        if (answers.startTask == "Add an employee") {
            addEmp()
        }
        if (answers.startTask == "Update employee role") {
            updateEmpRole()
        }
    })
}



db.query(`DELETE FROM course_names WHERE id = ?`, 3, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
});


db.query('SELECT * FROM course_names', function (err, results) {
    console.log(results);
});


