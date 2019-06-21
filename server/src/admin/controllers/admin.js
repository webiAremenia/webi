import Admin from '../models/admin';
import bcrypt from 'bcrypt';
import helper from '@helpers/functions';


exports.create = (req, res, next) => {
    Admin.find({email: req.body.email}).exec()
        .then(admin => {
            if (admin.length >= 1) {
                return res.status(409).json({
                    message: 'Admin already exist !'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.status(500).json({error: err});
                    } else {
                        const admin = new Admin({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: hash,
                            role: req.body.role,
                            permissions: req.body.permissions
                        });
                        admin.save()
                            .then(result => {
                                res.status(201).json({message: 'admin created !'})
                            })
                            .catch(e => {
                                helper.errorHandler(res, e)
                            });
                    }
                })
            }
        });
};

exports.login = function (req, res, next) {
    Admin.find({email: req.body.email})
        .exec()
        .then(admin => {
            if (admin.length < 1) {
                return res.status(401).json({
                    error: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, admin[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        error: 'Auth failed'
                    });
                }
                if (result) {
                    const token = Admin.getToken(admin[0]);
                    return res.status(200).json({success: true, token: token});
                }
                res.status(401).json({
                    error: 'Auth failed'
                });
            })
        })
        .catch(e => {
            helper.errorHandler(res, e)
        });
};

exports.update = (req, res, next) => {
    Admin.updateOne({_id: req.params.adminId}, req.body)
        .exec()
        .then(doc => {
            if (doc.n === 1) {
                if (doc.nModified === 1) {
                    res.status(200).json({message: 'updated success !!!'});
                } else {
                    res.status(200).json({message: 'no update items !!!'})
                }
            } else {
                res.status(404).json({
                    error: 'Not found'
                })
            }
        })
        .catch(e => {
            helper.errorHandler(res, e)
        })
};

exports.delete = (req, res, next) => {

    Admin.findByIdAndDelete({_id: req.params.adminId})
        .exec()
        .then(r => {
            res.status(200).json({message: 'Admin deleted !'});
        })
        .catch(e => helper.errorHandler(res, e));


};

