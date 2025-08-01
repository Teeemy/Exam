const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const getUser = async (req, res) => {
    const { id } = req.user;
    const allUsers = await userModel.findById(id).populate("kyc").populate("posts");
    return res.json(allUsers)
}

const createUser = async (req, res) => {
    const { email, password, ...others } = req.body;
    if (!email || !password) {
        return res.send("please provide valid email and password");
    }
    const isUser = await userModel.findOne({ email: email })
    if (isUser) {
        return res.send("User already exist, please login")
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    try {
        const newUser = new userModel({ email, password: hashedPassword, ...others });
        const savedUser = await newUser.save()
        return res.json(savedUser)
    } catch (error) {
        console.log(error.message);
        return res.send("something went wrong")
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.send("Account does not exist");
    };
    const passwordValid = bcrypt.compareSync(password, user.password)
    if (!passwordValid) {
        return res.send("Password is not valid,Please provide a valid password");
    };

    const token = jwt.sign({ name: user.name, id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 });
    return res.cookie("token", token, {maxAge: 1000 * 60 * 60, secure: true, httponly: true,}).json({message:"Login Successful"})
}
module.exports = { getUser, createUser, loginUser };

    
