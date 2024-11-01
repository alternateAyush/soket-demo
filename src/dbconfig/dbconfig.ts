import mongoose from "mongoose";

export const connect = async ()=>{
    try{
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log("Connected successfully");
        })
        connection.on('error',(e)=>{
            console.log('mongoose connection error: ',e);
            process.exit(1);
        })

    }catch(e){
        console.log('dbconfig error:');
        console.log(e);
    }
}