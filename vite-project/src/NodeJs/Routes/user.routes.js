import { loginUser, registerUser } from "../Controllers/user.controller.js";

//Routes for user Api's
export function userRoutes(app) {
    app.post("/registerUser", registerUser);
    app.post("/loginUser", loginUser);
};