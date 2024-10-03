import userModel from "../Model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Api for User registration
export function registerUser(req, res) {

    const { firstName, lastName, email, password, age, country } = req.body;

    if(!firstName || !lastName || !email || !password || !age || !country) {
        return res.status(400).json({message: "Please fill in the required field"});
    };

    //If email already exist then return
    userModel.findOne({ email }).then(data => {
        if (data) {
            return res.status(400).json({ message: "Email already register" });
        } else {

            const newUser = new userModel({
                firstName,
                lastName,
                email,
                password: bcrypt.hashSync(password, 10),
                age,
                country
            });

            newUser.save().then(data => {
                if (!data) {
                    return res.status(400).json({ message: "User not register! Try again" });
                }
                res.status(200).send(data);
            });
        }
    }).catch(err => res.status(500).json({ message: err.message }));
};

//Api for Login user
export function loginUser(req, res) {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({message: "Please fill in the required field"});
    };

    //If email not exist then return
    userModel.findOne({ email }).then(data => {
        if (!data) {
            return res.status(403).json({ message: "Invalid Email" });
        }

        //Compare password with database password
        let isValidPassword = bcrypt.compareSync(password, data.password);

        if (!isValidPassword) {
            return res.status(403).json({ message: "Invalid Password" })
        }

        //Generate token for authorization
        let token = jwt.sign({ id: data._id }, "projectkey", { expiresIn: '30m' });

        res.send({
            user: {
                firstName: data.firstName,
                lastName: data.lastName
            },
            accessToken: token
        });
    }).catch(err => res.status(500).json({ message: err.message }));
};