

//different conditions rules objects
const conditions={
    gte:(item1,item2)=>{
        return item1>=item2
        },
    neq:(item1,item2)=>{
        return item1!=item2
        },
    gt:(item1,item2)=>{
        return item1>item2
        },
    eq:(item1,item2)=>{
        return item1==item2
        },
    contains:(item1,item2)=>{
            return item1===item2
            }
}
//validation function that takes different arguement
const ValidatorFunction=(conditions,rule,item1,item2,req,res)=>{
    const isValidated=conditions[rule['condition']](item1,item2)
    if (isValidated){

        return  res.status(200).json({
            "message": `field ${rule['field']} successfully validated.`,
            "status": "success",
            "data": {
              "validation": {
                "error": false,
                "field": rule['field'],
                "field_value": item1,
                "condition": rule['condition'],
                "condition_value": item2
              }
            }
          })
    }
    else return res.status(400).json({
        "message": `field ${rule['field']} failed validation.`,
        "status": "error",
        "data": {
          "validation": {
            "error": true,
            "field": rule['field'],
            "field_value": item1,
            "condition": rule['condition'],
            "condition_value": item2
          }
        }
      })
}


//validation contrroller
exports.Validaterule=async function(req,res){
const {rule,data}=req.body
// const signs={
// "eq":"=",
// "gta":">",
// }
if(!rule){
    return res.status(400).json(
        {
            "message": "rule is required.",
            "status": "error",
            "data": null
          }
    )
}
if(typeof(rule)!="object"){
    return res.status(400).json(
        {
            "message": "rule should be an object.",
            "status": "error",
            "data": null
          }
    )
}
if(!data){
    return res.status(400).json(
        {
            "message": "data is required.",
            "status": "error",
            "data": null
          }
    )
}

//check if type of data is an array or object or string
if(typeof(data)=="object"||Array.isArray(data)||typeof(data)=="string"){
    if(typeof(data)=="string"){console.log("its a string")
const item1=data[rule["field"]]
const item2=rule["condition_value"]
console.log(item1,item2)
    return ValidatorFunction(conditions,rule,item1,item2,req,res)}
    if(Array.isArray(data)){
     if( typeof( data[rule['field']])==="undefined"){
         return res.status(400).json({
            "message": `field ${rule['field']} is missing from data.`,
            "status": "error",
            "data": null
          })
     }
     else{  
        const item1= data[rule['field']]
        const item2=rule["condition_value"]
        return ValidatorFunction(conditions,rule,item1,item2,req,res)
     }
    }


}
else{  
return res.status(400).json(
    {
        "message": "data should be an object or string.",
        "status": "error",
        "data": null
      }
)}

//check for nexted value in data field
if(rule['field'].includes(".")){
   const level1=rule['field'].split(".")[0]
   const level2=rule['field'].split(".")[1]
   console.log(level1)
   console.log(level2)
   const item1=data[level1][level2]
   const item2=rule['condition_value']
   if(data[level1].hasOwnProperty(level2)){
       console.log("nexted value")
      return ValidatorFunction(conditions,rule,item1,item2,req,res)
   }

}

if (!data.hasOwnProperty(rule['field'])){
    return res.status(400).json({
        "message": `field ${rule['field']} is missing from data.`,
        "status": "error",
        "data": null
      })
}
if(conditions.hasOwnProperty(rule['condition'])){
    console.log(conditions[rule['condition']])
    const item1=data[rule['field']]
    const item2=rule['condition_value']
    //we call on the function from condtional objects by supllying the arguments

//calling the calidation function
    ValidatorFunction(conditions,rule,item1,item2,req,res)

}
 
// res.status(200).json({"":""})
}





// {
//     rule: { field: 'missions', condition: 'gte', condition_value: 30 },
//     data: {
//       name: 'James Holden',
//       crew: 'Rocinante',
//       age: 34,
//       position: 'Captain',
//       missions: 45
//     }
//   }