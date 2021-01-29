const express=require("express")
const app= express()
const HomeRoutes=require("./routes/homeRoutes")
const ValidateruleRoutes=require("./routes/validationRoutes")


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(function(err, req, res, next) {

  // error handling logic
  console.error(err.stack);
  res.status(400).json({
    "message": "Invalid JSON payload passed.",
    "status": "error",
    "data": null
  });

});
app.use(HomeRoutes)
app.use(ValidateruleRoutes)
const port =process.env.PORT||3000

app.listen(port,(err,success)=>{
    if(err) throw err;
    console.log(`server running on port ${port}`)
})