const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
let static_path = path.join(__dirname,"../public");
const template = path.join(__dirname,"../templates/views")
const par = path.join(__dirname,"../templates/partials")
const port = process.env.PORT || 3000;

hbs.registerPartials(par);
app.use(express.static(static_path));

app.set ("view engine","hbs");

app.set("views",template);

app.get("/",(req,res) => {
  res.render("index")
})

app.get("/about",(req,res) =>{
  res.render("about")
})

app.get("/weather",(req,res) => {
  res.render("weather");
})

app.get("/*",(req,res) => {
  res.render("404_error")
})

app.listen(port,() => console.log("server has start..."));
