require('dotenv').config()
const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('console.table');

// create the connection information for the sql database
const connection = mysql.createConnection({
    host: process.env.HOST || 'localhost',

    // Your port; if not 3306
    port: process.env.PORT || 3306,

    // Your username; if not root
    user: proccess.env.USER || 'root',

    // Your password; if not default
    password: process.env.PWD || '',

    //   Your database; if not bamazon
    database: process.env.DB || 'bamazon'
});

// connect to the mysql server and sql database
connection.connect((err) => {
    if (err) throw err;
    console.log(`Connected as ID: ${connection.threadId}`);
    // run the start function after the connection is made to prompt the user
    display();
});

function display() {
    // query the database for all items
    connection.query('SELECT * FROM products', (err, res) => {
        if (err) throw err;
        // display product items
        table(res);
        // once you have the items, prompt the user for which they'd like to buy
        start();
    })
}