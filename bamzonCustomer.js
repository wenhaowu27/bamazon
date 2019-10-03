var mysql = require("mysql");
var inquirer= require("inquirer");
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
  askcustomerQuestion();
});



  function askcustomerQuestion(){
    inquirer.prompt([
      {
        type: "list",
        name: "thingToDo",
        message: "What do you like to do?",
        choices: ["READ", "BUY", "QUIT"]
      }    
      ]).then(function(ans1) {
       if (ans1.thingToDo === "READ"){       
         displayCatelog();         
       }  else if (ans1.thingToDo ==="BUY"){
        console.log("BUY");
        thingToBuy();
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
      console.log("readCatelog");  
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

// Display catelog

// function displayCatelog() { 
//   connection.query("SELECT * FROM catelog", function(err, res) { 
//   console.log(titleItem + space(titleItem.length, 9) + titleName + space(titleName.length,36) + titleSales + space(titleSales.length,15) + titleDept + space(titleDept.length, 17) + titlePrice + space(titlePrice.length,7) + titleStock);
//   console.log(linep(7) + "  " + linep(34) + "  " + linep(13) + "  " + linep(15) + "  "  + linep(5) + "  " + linep(13));
//     for (var i = 0; i < itemID.length; i++) {
//       console.log(res[i].item_id + space(res[i].item_id.toString(10).length, 9) +  res[i].product_name + space(res[i].product_name.length,36) + res[i].product_sales + space(res[i].product_sales.toString(10).length,15) + res[i].department_name + space(res[i].department_name.length, 17) + res[i].price + space(res[i].price.toString(10).length, 7) + res[i].stock_quantity);
//     }
//     console.log("\n\n");
//     askcustomerQuestion(); 
// });
// }

// Display catelog

function displayCatelog() { 
  console.log("\n\n")
  connection.query("SELECT * FROM catelog", function(err, res) { 
  console.log(titleItem + space(titleItem.length, 9) + titleName + space(titleName.length,36) + titleDept + space(titleDept.length, 17) + titlePrice + space(titlePrice.length,7) + titleStock);
  console.log(linep(7) + "  " + linep(34) + "  " + linep(15) + "  " + linep(5) + "  " + linep(13));
    for (var i = 0; i < itemID.length; i++) {
      console.log(res[i].item_id + space(res[i].item_id.toString(10).length, 9) +  res[i].product_name + space(res[i].product_name.length,36) + res[i].department_name + space(res[i].department_name.length, 17) + res[i].price + space(res[i].price.toString(10).length, 7) + res[i].stock_quantity);
    }
    console.log("\n\n");
    askcustomerQuestion(); 
});
}

//Buy from catelog function

 function thingToBuy(){
  inquirer.prompt([
    {
      type: "input",
      name: "itemToBuy",
      message: "Select from item_id",
    },
    {
      type: "input",
      name: "quantityToBuy",
      message: "How many",      
    }
  ]).then(function(ans2){
    var buyId = parseInt(ans2.itemToBuy);
    var buyQuantity = parseInt(ans2.quantityToBuy);
    var buyId1 = buyId - 1;   
    if(buyQuantity > stockQuantity[buyId1] || stockQuantity[buyId1] === 0){
      console.log("\n\n");
      console.log("Low inventory! please select other item")
      console.log("\n\n");
      displayCatelog();
    }else{
    productSales[buyId1] = productSales[buyId1] + productPrice[buyId1] * buyQuantity;
    stockQuantity[buyId1] = stockQuantity[buyId1] - buyQuantity;
    console.log("Your total cost is $" + productPrice[buyId1] * buyQuantity);
    console.log("Thank you for shopping with Bamazon!!! \n\n\n");
    updateCatelog(buyId);
  }
  })
 }

 //Update catelog 

function updateCatelog(updateId){
  updateId1 = updateId - 1;
  // console.log("UpdateCatelog")
  
  var query = connection.query(
    "UPDATE catelog SET ? WHERE ?",
    [
      {
          product_sales: productSales[updateId1],
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

  