const express=require("express")
const {GetMyDeatails}=  require("../controllers/MydetailsController")

const Router= express.Router()



Router.get("/",GetMyDeatails)



module.exports= Router






