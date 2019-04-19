import Client from '../models/client';
import helper from '../../_helpers/functions';
import bcrypt from 'bcrypt';
import randomsPass from 'randomstring';


module.exports = {

    createAccount(req, res, next) {
        Client.findOne({email: req.body.email})
            .exec()
            .then(c => {
                if (c) {
                    res.status(409).json({
                        success: false,
                        error: 'email address already exist !!!'
                    })
                } else {
                    const password = randomsPass.generate({
                        length: 12,
                        charset: 'hex'
                    });
                    bcrypt.hash(password, 10, (err, hash) => {
                        if (err) {
                            res.status(500).json({error: err});
                        } else {
                            const client = new Client({
                                firstName: req.body.name,
                                lastName: req.body.lastName,
                                nikName: req.body.nikName,
                                email: req.body.email,
                                password: hash,
                            });
                            client.save()
                                .then(result => {
                                    let html = `<a href="http://localhost:3000/cabinet/${req.body.nikName}">Your cabinet here</a> <br> <p>your Password is: ${password}</p>`;
                                    helper.sendAccount(res, html, result.email);
                                })
                                .catch(e => {
                                    helper.errorHandler(res, e)
                                });
                        }
                    })
                }
            })
            .catch(e => helper.errorHandler(res, e))
    },

    login(req, res, next) {
        Client.findOne({email: req.body.email})
            .exec()
            .then(client => {
                if (!client) {
                    return res.status(404).json({
                        message: 'No such client'
                    });
                }
                bcrypt.compare(req.body.password, client.password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: 'Auth failed'
                        });
                    }
                    if (result) {
                        const token = Client.getToken(client);
                        return res.status(200).json({success: true, token: token});
                    }
                    res.status(401).json({
                        message: 'Auth failed'
                    });
                })
            })
            .catch(e => helper.errorHandler(res, e))
    },

    changePass(req, res, next) {
        Client.findOne({_id: req.client.id})
            .exec()
            .then(client => {
                if (client) {

                    bcrypt.compare(req.body.oldPassword, client.password, (err, result) => {
                        if (err) {
                            return res.status(401).json({
                                message: 'Auth failed'
                            });
                        }
                        if (result) {
                            console.log(55);
                            bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
                                if (err) {
                                    res.status(500).json({error: err});
                                } else {
                                    client.password = hash;
                                    client.save()
                                        .then(result => {
                                            if (result) {
                                                return res.status(200).json(result)
                                            }
                                        })
                                        .catch(e => {
                                            helper.errorHandler(res, e)
                                        });
                                }
                            })
                        } else {
                            return res.status(401).json({
                                message: 'Auth failed'
                            });
                        }
                    })

                } else {
                    res.status(500).json({
                        success: false,
                        error: 'something wrong'
                    })
                }
            })
            .catch(e => helper.errorHandler(res, e))
    },

    getAll(req, res, next) {
        Client.find({})
            .exec()
            .then(clients => {
                if (clients.length < 1) {
                    res.status(200).json({success: true, clients: []})
                } else {
                    res.status(200).json(clients.map(c => {
                            return {
                                id: c._id,
                                firstName: c.firstName,
                                lastName: c.lastName,
                                nikName: c.nikName,
                                email: c.email,
                                status: c.status
                            }
                        })
                    )
                }
            })
            .catch(e => helper.errorHandler(res, e))
    }

};