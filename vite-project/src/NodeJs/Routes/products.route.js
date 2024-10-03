import { fetchOneProduct, fetchProducts } from "../Controllers/products.controller.js";

//Routes for product Api's
export function productRoutes(app) {
    app.get("/products", fetchProducts);
    app.get("/products/:id", fetchOneProduct);
};