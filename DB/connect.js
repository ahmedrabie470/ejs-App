const mongoose = require("mongoose");


const connectDB  = ()=>{
    return mongoose.connect(process.env.CONNECTIONSTRING).then((Result) =>{
        console.log("connected");
    }).catch((error)=>{
        console.log("fail to connect DB");
    })
}


module.exports   = {
    connectDB
}