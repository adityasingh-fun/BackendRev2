const express = require('express');
const mongoose = require('mongoose');
const validator = require('validator');

const app = express();

const mongodbURL = "mongodb+srv://chaudharyaditya41:xIIaFbMscNbxbMOG@fullstack-cluster.ahasqgz.mongodb.net/?retryWrites=true&w=majority&appName=fullstack-cluster";
const connectDB = async ()=>{
    try{
        await mongoose.connect(mongodbURL);
        console.log("MongoDB connected successfully");
    }
    catch(error){
        console.log(error.message);
    }
}

connectDB();

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please provide username"],
        validate:{
            validator: (value)=>{
                return validator.isAlphanumeric(value)
            }
        }
    },
    email:{
        type:String,
        required:[true,"Please provide email"],
        validate:{
            validator: (value)=>{
                return validator.isEmail(value);
            },
            message:"Invalid email"
        }
    },
    age:{
        type:String,
        required:[true,"Please provide your age"],
        validate:{
            validator:(value)=>{
                return validator.isInt(value,{min:0,max:100});
            },
            message:"Invalid age"
        }
    },

},{timestamps:true});

const user = mongoose.model("user",userSchema);

const createUser = async ()=>{
    try{
        const result = await user.create({
            username:"adiiw",
            email:"aditya@ahoo.com",
            age:101
        })
        console.log(result);
    }
    catch(error){
        console.log(error.message);
    }
}
createUser();

const PORT =8082;
app.listen(PORT,()=>{
    console.log(`Server App listening to PORT, ${PORT}`)
});