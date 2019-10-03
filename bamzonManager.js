var mysql = require("mysql");
var inquirer= require("inquirer");
// const cTable = require('console.table');
var stockData=[];
var indexID = [];
var itemID = [];
var productName = [];
var productSales =[];
var departmentName = [];
var productPrice = [];
var stockQuantity = [];
var titleItem = "item_id";
var titleName = "product_name";
var titleSales = "product_sales";
var titleDept = "department_name";
var titlePrice = "price";
var titleStock = "stock_quantity";

// Establish connection with mysql

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  readCatelog();
  askManagerQuestion();
});



  function askManagerQuestion(){
    inquirer.prompt([
      {
        type: "list",
        name: "thingToDo",
        message: "What do you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product","QUIT"]
      }    
      ]).then(function(ans1) {
       if (ans1.thingToDo === "View Products for Sale"){       
         displayCatelog();         
       }  else if (ans1.thingToDo ==="View Low Inventory"){  
         viewLowInventory();
       }  else if (ans1.thingToDo ==="Add to Inventory"){        
         addToInventory();
       }  else if (ans1.thingToDo ==="Add New Product"){
         addNewProduct();           
       } else {
         connection.end();
       }
      } 
      )}
 
//Read from catelog function

  function readCatelog() {
    itemID = [];
    productName = [];
    productSales =[];
    departmentName = [];
    productPrice = [];
    stockQuantity = [];
    connection.query("SELECT * FROM catelog", function(err, res) {   
      // console.log("readCatelog");  
      if (err) throw err;
      stockData = res;
      for (var i = 0; i < res.length; i++) {
        itemID.push(res[i].item_id);
        productName.push(res[i].product_name);
        productSales.push(res[i].product_sales);
        departmentName.push(res[i].department_name);
        productPrice.push(res[i].price);
        stockQuantity.push(res[i].stock_quantity)
      }
    });
  }

//Display catelog

function displayCatelog() { 
  readCatelog();
  connection.query("SELECT * FROM catelog", function(err, res) { 
  console.log(titleItem + space(titleItem.length, 9) + titleName + space(titleName.length,36) + titleSales + space(titleSales.length,15) + titleDept + space(titleDept.length, 17) + titlePrice + space(titlePrice.length,7) + titleStock);
  console.log(linep(7) + "  " + linep(34) + "  " + linep(13) + "  " + linep(15) + "  "  + linep(5) + "  " + linep(14));
    for (var i = 0; i < itemID.length; i++) {
      console.log(res[i].item_id + space(res[i].item_id.toString(10).length, 9) +  res[i].product_name + space(res[i].product_name.length,36) + res[i].product_sales + space(res[i].product_sales.toString(10).length,15) + res[i].department_name + space(res[i].department_name.length, 17) + res[i].price + space(res[i].price.toString(10).length, 7) + res[i].stock_quantity);
    }
    console.log("\n\n");
    askManagerQuestion(); 
});
}


function viewLowInventory() { 
  connection.query("SELECT * FROM catelog WHERE stock_quantity <= 10", function(err, res4) { 
    if(err){throw err;}
    // console.table(res4);
  console.log(titleItem + space(titleItem.length, 9) + titleName + space(titleName.length,36) + titleSales + space(titleSales.length,15) + titleDept + space(titleDept.length, 17) + titlePrice + space(titlePrice.length,7) + titleStock);
  console.log(linep(7) + "  " + linep(34) + "  " + linep(13) + "  " + linep(15) + "  "  + linep(5) + "  " + linep(14));
    for (var i = 0; i < res4.length; i++) {
      console.log(res4[i].item_id + space(res4[i].item_id.toString(10).length, 9) +  res4[i].product_name + space(res4[i].product_name.length,36) + res4[i].product_sales + space(res4[i].product_sales.toString(10).length,15) + res4[i].department_name + space(res4[i].department_name.length, 17) + res4[i].price + space(res4[i].price.toString(10).length, 7) + res4[i].stock_quantity);
    }
    console.log("\n\n");
    askManagerQuestion(); 
});
}

//Buy from catelog function

 function addToInventory(){
  inquirer.prompt([
    {
      type: "input",
      name: "itemToAdd",
      message: "Select from item_id",
    },
    {
      type: "input",
      name: "quantityToAdd",
      message: "How many",      
    }
  ]).then(function(ans2){
    var addId = parseInt(ans2.itemToAdd);
    var addQuantity = parseInt(ans2.quantityToAdd);
    var addId1 = addId - 1;          
    stockQuantity[addId1] = stockQuantity[addId1] + addQuantity;
    console.log("You have added " + addQuantity + "  to " + productName[addId1]);
    updateCatelog(addId);  
  })
 }

 
 //Update catelog 

function updateCatelog(updateId){
  updateId1 = updateId - 1;
  
  var query = connection.query(
    "UPDATE catelog SET ? WHERE ?",
    [
      {          
          stock_quantity: stockQuantity[updateId1]
      },
      {
          item_id: updateId
      }
    ],
    function(err, res1) {
      if (err) throw err;
      displayCatelog();
    }
  );
}


//Add new product

function addNewProduct(){
  inquirer.prompt([
    {
      type: "input",
      name: "addProduct",
      message: "Adding New Product?   ",
    },
    {
      type: "input",
      name: "deptName",
      message: "Add to what department?   ",
    },
    {
      type: "input",
      name: "cost",
      message: "How much for price tag?   ",
    },
    {
      type: "input",
      name: "AddQuantity",
      message: "How many would you like to add?    ",      
    }
  ]).then(function(ans3){
    var query = connection.query(
      "INSERT INTO catelog SET ?",
      {       
       product_name: ans3.addProduct,
       product_sales: 0,
       department_name: ans3.deptName,
       price: parseFloat(ans3.cost),
       stock_quantity: parseInt(ans3.AddQuantity)
      },
      function(err, res2) {
        if (err) throw err;
       console.log(res2.affectedRows + " product inserted!\n");
        // Call updateProduct AFTER the INSERT completes
        // updateProduct();
        askManagerQuestion(); 
       }
     );
  })
 }

 

 // print whitespace

 function space(x, y){
  var whitespace = " "
  var return_space = ""
   var new_length = y-x;
   for (let i = 0; i < new_length; i++){
      return_space += whitespace
   }
   return return_space
}

// print line
function linep(z){
  var whiteline = "-";
  var return_line = "";
   for (let i = 0; i < z; i++){
      return_line += whiteline;
   }
   return return_line;
}

  