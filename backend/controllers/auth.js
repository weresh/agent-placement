var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var User = require("../models/user");

const signup = async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);

        const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            mobile_number: req.body.mobile_number,
            email: req.body.email,
            role: req.body.role,
            password: hashedPassword
        });

        await user.save();

        res.status(200).send({ message: "User Registered successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};


const signin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }).exec();

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        const token = jwt.sign({ id: user.id }, process.env.API_SECRET, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
            user: {
                id: user._id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                mobile_number: user.mobile_number,
                role: user.role,
                personel_id: user.personel_id
            },
            message: "Login successful",
            accessToken: token,
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

module.exports = { signin, signup };
