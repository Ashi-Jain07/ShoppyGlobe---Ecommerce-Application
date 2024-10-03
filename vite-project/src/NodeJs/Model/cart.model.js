import mongoose from "mongoose";

//create a cart model
const cartSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const cartModel = mongoose.model("cart", cartSchema);

export default cartModel;