require('dotenv').config()
const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('console.table');

// create the connection information for the sql database
const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username; if not root
    user: 'root',

    // Your password; if not default
    password: 'root',

    //   Your database; if not bamazon
    database: 'bamazon'
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
        console.table(res);
        // once you have the items, prompt the user for which they'd like to buy
        start();
    })
}

function start() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'What is the ITEM_ID of the product you would like to buy?',
            validate: (answer)=>{
                // Inquirer preferred way with promise to validate value
                return new Promise((resolve, reject) => {
                    connection.query('SELECT item_id FROM products', (err, res) => {
                        if (err) throw err;
                        let flag = false;
                        for (let i in res) {
                            if (res[i].item_id == answer) {
                                flag = true;
                                break;
                            }
                        }
                        if (flag) {
                            resolve(true);
                        }
                        else {
                            reject('ITEM_ID does not exist');
                        }
                    })
                })
            }
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many units would you like?',
            validate: (answer)=> {
                return new Promise((resolve, reject) => {
                    if (typeof answer === 'number') {
                        reject('Not a valid quantity');
                    }
                    else {
                        resolve(true);
                    }
                })
            }
        }
    ]).then((answer) => {
        connection.query('SELECT * FROM products WHERE ?',
            {
                item_id: answer.id
            },
            (err, res) => {
                if (err) throw err;
                let oldStock = res[0].stock_quantity;
                let newStock = oldStock - answer.quantity;
                let oldPurchased = res[0].product_sales;
                let purchased = answer.quantity * res[0].price;
                if (newStock > -1) {
                    connection.query('UPDATE products SET ? WHERE ?',
                        [{
                            stock_quantity: newStock
                        },
                        {
                            item_id: answer.id
                        }],
                        (err, res) => {
                            if (err) throw err;
                            console.log('Item purchased!')
                            let newPurchased = parseInt(oldPurchased) + parseInt(purchased);
                            connection.query('UPDATE products SET ? WHERE ?',
                                [{
                                    product_sales: newPurchased
                                },
                                {
                                    item_id: answer.id
                                }],
                                (err, res) => {
                                    if (err) throw err;
                                    console.log('Sales Updated');
                                    display();
                                }
                            )
                        }
                    )
                }
                else {
                    console.log('Insufficient quantity!');
                    display();
                }
            }
        )
    });
}