import cartModel from "../Model/cart.model.js";

//Api for fetch item from cart
export function fetchItem(req, res) {
    cartModel.find().then(data => {
        if (!data) {
            return res.status(404).json({ message: "Item not found" });
        };
        res.send(data);
    }).catch(err => res.status(500).json({ message: err.message }));
}

//Api for add item to cart
export function addItem(req, res) {
    const { _id, title, image, rating, quantity } = req.body;

    if(!_id || !title || !image || !rating || !quantity) {
        return res.status(400).json({ message: "Provide all details" });
    };

    //If item already exist then update quantity
    cartModel.findById(_id).then(data => {
        if (data) {
            data.quantity = data.quantity + 1;
            data.save().then(data => {
                if (!data) {
                    return res.status(400).json({ message: "Quantity not increased" })
                }
                res.status(200).send(data);
            }).catch(err => res.status(500).json({ message: err.message }))
        } else {
            const newItem = new cartModel({
                _id,
                title: title,
                image: image,
                rating: rating,
                quantity: quantity
            });

            newItem.save().then(data => {
                if (!data) {
                    return res.status(400).json({ message: "Product not added" });
                }
                res.status(200).send(data);
            }).catch(err => res.status(500).json({ message: err.message }));
        }
    }).catch(err => res.status(500).json({ message: err.message }));
};

//Api for update quantity of item in cart
export function updateQuantity(req, res) {
    const _id = req.params.id;
    const quantity = req.body;

    if(!_id || !quantity) {
        return res.status(400).json({ message: "Provide Id and Quantity" });
    };

    cartModel.findByIdAndUpdate(_id, quantity).then(data => {
        if (!data) {
            return res.status(400).json({ message: "Product not found" });
        }
        res.status(200).send(data);
    }).catch(err => res.status(500).json({ message: err.message }));
};

//Api for remove item from cart
export function removeItem(req, res) {
    const _id = req.params.id;

    if(!_id) {
        return res.status(400).json({ message: "Provide Id" });
    };

    cartModel.findByIdAndDelete(_id).then(data => {
        if (!data) {
            return res.status(400).json({ message: "Product not found" });
        }
        res.status(200).send(data);
    }).catch(err => res.status(500).json({ message: err.message }));
};

//Api for clear cart
export function clearCart(req, res) {
    cartModel.deleteMany().then(data => {
        if (!data) {
            return res.status(400).json({ message: "No data" });
        }
        res.status(200).send(data);
    }).catch(err => res.status(500).json({ message: err.message }));
};