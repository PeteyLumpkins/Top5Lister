const auth = require('../auth')
const User = require('../models/user-model')
const bcrypt = require('bcryptjs')

loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        // All fields given?
        if (!email || !password) {
            return res.status(400).json({errorMessage: "Please enter all required fields."});
        }

        let user = await User.findOne({email: email});
        // Does the user exist?
        if (!user) {
            user = await User.findOne({userName: email});
            if (!user) {
                return res.status(400).json({errorMessage: "Invalid username/email or password"});
            }
        }

        const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

        // Do the passwords match?
        if (!passwordCorrect) {
            return res.status(401).json({ 
                errorMessage: "Invalid username or password",
            });
        }

        // Valid user -> get them a token
        const token = auth.signToken(user)

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: {
                id: user._id,
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        }).send();

    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
}

logoutUser = async (req, res) => {
    res.cookie("token", "token", {maxAge: -1}).status(200).json({ 
        success: true, 
        message: "User has logged out successfully!"
    }).send();
}

getLoggedIn = async (req, res) => {
    auth.verify(req, res, async function () {
        const loggedInUser = await User.findOne({ _id: req.userId });
        return res.status(200).json({
            loggedIn: true,
            user: {
                id: loggedInUser._id,
                userName: loggedInUser.userName,
                firstName: loggedInUser.firstName,
                lastName: loggedInUser.lastName,
                email: loggedInUser.email
            }
        }).send();
    })
}

registerUser = async (req, res) => {
    try {
        const { firstName, lastName, userName, email, password, passwordVerify } = req.body;
        if (!firstName || !lastName || !userName || !email || !password || !passwordVerify) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        if (password.length < 8) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }
        if (password !== passwordVerify) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter the same password twice."
                })
        }
        let existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this email address already exists."
                })
        }
        existingUser = await User.findOne({userName: userName});
        if (existingUser) {
            return res.status(400).json({success: false, errorMessage: "An account with this username already exists."})
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName, lastName, userName, email, passwordHash
        });
        const savedUser = await newUser.save();

        // LOGIN THE USER
        const token = auth.signToken(savedUser);

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: {
                id: savedUser._id,
                userName: savedUser.userName,
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                email: savedUser.email
            }
        }).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({errorMessage: "An unknown error occurred."}).send();
    }
}

module.exports = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser,
}