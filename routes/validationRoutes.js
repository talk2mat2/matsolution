const express=require("express")
const {Validaterule}= require("../controllers/ValidateruleController")

const Router= express.Router()



Router.post("/validate-rule",Validaterule)



module.exports= Router


