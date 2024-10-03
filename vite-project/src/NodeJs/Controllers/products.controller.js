import productModel from "../Model/products.model.js";

//Api to fetch all products from database
export function fetchProducts(req, res) {
    productModel.find().then(data => {
        if(!data) {
            return res.status(404).json({message: "Products not found"});
        }
        res.status(200).send(data)
    }).catch(err => res.status(500).json({message: err.message}));
};


//Api to fetch one product by id from database
export function fetchOneProduct(req, res) {
    const _id = req.params.id;

    productModel.findById(_id).then(data => {
        if(!data) {
            return res.status(404).json({message: "Products not found"});
        }
        res.status(200).send(data)
    }).catch(err => res.status(500).json({message: err.message}));
};