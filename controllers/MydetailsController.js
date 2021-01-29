

const MyData={
    name: "Martins Chukwuma",
    github: "@talk2mat2",
    email: "talk2martins2@gmail.com",
    mobile: "08037902606",
    twitter: "@Martins_Ecs"
  }



exports.GetMyDeatails=function(req,res){
    res.status(200).json({ message: "My Rule-Validation API",
    status: "success",MyData})
}