import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import { productRoutes } from "./Routes/products.route.js";
import { cartRoute } from "./Routes/cart.route.js";
import { userRoutes } from "./Routes/user.routes.js";

const app = new express;

//Create a server
app.listen("5100", () => {
    console.log("Server running on port 5100");
});

app.use(express.json());
app.use(cors());

//Connect application with mongoDB database
mongoose.connect("mongodb://localhost:27017");
const db = mongoose.connection;

//Check connection is successful or not
db.on("open", () => {
    console.log("Connection is successful");
});

db.on("error", () => {
    console.log("Connection failed");
});

//Provide app to routes
productRoutes(app);
cartRoute(app);
userRoutes(app);