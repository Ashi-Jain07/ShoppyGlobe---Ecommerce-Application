import { addItem, clearCart, fetchItem, removeItem, updateQuantity } from "../Controllers/cart.controller.js";
import { verifyUser } from "../Middleware/verifyUser.js";

//Routes for cart Api's
export function cartRoute(app) {
    app.get("/cart", verifyUser, fetchItem);
    app.post("/cart", addItem);
    app.patch("/cart/:id", updateQuantity);
    app.delete("/cart/:id", removeItem);
    app.delete("/cart", clearCart);
};