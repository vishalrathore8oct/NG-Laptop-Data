import express from "express";
import mongoose from "mongoose";
import User from "./user.models.js";

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/test-db")
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => {
        console.log("Database not connected", err);
    })

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.post("/create", async (req, res) => {
    try {

        const data = req.body;

        const { name, email } = data;

        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "Please provide name and email"
            })
        }

        const existingUser = await User.findOne({
            email: email
        })

        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        const user = await User.create(data);

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            userData: user
        })


    } catch (error) {
        console.log("Error while creating user", error);
    }

})

app.get("/read", async (req, res) => {
   try {

        const users = await User.find();

        return res.status(200).json({
            success: true,
            message: "Users fetched successfully", 
            userData: users
        })
    
   } catch (error) {
    console.log("Error while reading user", error);
    
   }
})

app.listen(8080, () => {
    console.log("Server is running on port 8080");
})