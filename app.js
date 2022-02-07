//jshint eversion:6

const express = require("express");
const bodyparser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
const items=[];
const workItems =[];
app.set("view engine", "ejs");

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {

  const day = date.getDate();


  //
  //
  // var currentday = today.getDay();
  // var day = "";
  //
  // switch (currentday) {
  //   case 6:
  //     day = "Saturday";
  //     break;
  //   case 0:
  //     day = "Sunday";
  //     break;
  //   case 1:
  //     day = "Monday";
  //     break;
  //   case 2:
  //     day = "Tuesday";
  //     break;
  //   case 3:
  //     day = "Wednesday";
  //     break;
  //   case 4:
  //     day = "Thursday";
  //     break;
  //   case 5:
  //     day = "Friday";
  //     break;
  //   default:
  //     console.log("Error: currentday is equal to: " + currentday);
  // }
  res.render("list", {
    listTitle: day,
    newListItems: items
  });
});

app.post("/", function(req, res){

  let item = req.body.newItem;

  if(req.body.list === "Work")
  {
    workItems.push(item);
    res.redirect("/work");
  }
  else
  {
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.post("/work", function(req, res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("server started on port 3000");
});
