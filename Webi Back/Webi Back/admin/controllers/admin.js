const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


module.exports.register = async (req, res) => {
    const candidate = await Admin.findOne({email: req.body.email});
    if (candidate) {
        res.json({
            success: false,
            msg: "Try another email"
        })

    } else {

        const password = req.body.password;
        const salt = bcrypt.genSaltSync(10);


        const admin = new Admin({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt),
        });

        try {
            admin.save();
            res.json({
                success: true,
                msg: "User added",
                admin : {
                    email : admin.email,
                }
            })
        } catch (e) {
            console.log(e)
        }
    }
};



module.exports.login = async (req, res) => {

    const candidate = await Admin.findOne({email: req.body.email});

    if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if (passwordResult) {

            const token = jwt.sign({adminId: candidate._id.toString(), role : candidate.role.toString()},'secret');
            res.json({
                success : true,
                msg : "Welcome",
                token : 'Bearer ' + token,
                email : candidate.email
            })
        } else {
            res.status(200).json({
                success: false,
                msg: "Wrong password"
            })
        }
    } else {
        res.json({
            success: false,
            msg: "Wrong email"
        })
    }
};