
const mysql = require('mysql2');
var inquirer = require('inquirer');
var cTable = require('console.table');

const db = mysql.createConnection(
    {
        host: 'localhost',

        user: 'root',

        password: 'Mollusk42',
        database: 'employees_db'
    },
    console.log(`Connected to the courses_db database.`)
);


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
    });


const viewDep = function () {
    db.query(`SELECT * FROM department`,function (err, results) {
        console.table(results)
    })
};

const viewRoles = function () {
    db.query(`SELECT * FROM roles`,function (err, results) {
        console.table(results)
    })
};

const viewEmp = function () {
    db.query(`SELECT * FROM employee`,function (err, results) {
        console.table(results)
    })
};

const addDep = function () {
    inquirer
        .prompt({
            type: "input",
            message: "What is the department name?",
            name: "depName"
        })
        .then((answers) => {
           db.query(`INSERT INTO department (department_name) VALUES (${answers.depName})`,function (err, results) {
                 console.table(results);
            })
        })
};

const addRole = function () {
    inquirer
        .prompt({
            type: "input",
            message: "What is the title of the role?",
            name: "role"
        },
        {
            type: "input",
            message: "What is the average salary?",
            name: "salary"
        },
        {
            type: "input",
            message: "What is the id of the relevant department?",
            name: "relDep"
        })
        .then((answers) => {
            db.query(`INSERT INTO roles (title, salary, department_id) VALUES (${answers.role}, ${answers.salary}, ${answers.relDep})`,function (err, results) {
                console.table(results);
            })
        })
};

const addEmp = function () {
    inquirer
        .prompt({
            type: "input",
            message: "What is their first name?",
            name: "firstName"
        },
        {
            type: "input",
            message: "What is their last name?",
            name: "lastName"
        },
        {
            type: "input",
            message: "What is the id of their role?",
            name: "roleId"
        },
        {
            type: "input",
            message: "What is the id of their manager?",
            name: "manageId"
        })
        .then((answers) => {
             db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (${answers.firstName}, ${answers.lastName}, ${answers.roleId}, ${answers.manageId})`,function (err, results) {
                 console.table(results);
                 })
             })
};

const updateEmpRole = function () {
    inquirer
        .prompt({
            type: "input",
            message: "What is the id of the employee you'd like to update?",
            name: "empId"
        },
        {
            type: "input",
            message: "What is the id of their new role?",
            name: "roleId"
        })
        .then((answers) => {
             db.query(`UPDATE employee SET role_id = ${answers.roleId} WHERE id = ${empId}`,function (err, results) {
                 console.table(results);
                 })
             })
};


