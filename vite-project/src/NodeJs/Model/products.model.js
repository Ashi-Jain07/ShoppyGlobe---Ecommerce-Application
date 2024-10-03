import mongoose from "mongoose";

//Create a product model
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    brand: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    availabilityStatus: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    shippingInformation: {
        type: String,
        required: true
    },
    quantity: {
        type: Number
    }
});

const productModel = mongoose.model("product", productSchema);

export default productModel;