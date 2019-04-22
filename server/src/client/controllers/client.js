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
                    new Client({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        nikName: req.body.nikName,
                        email: req.body.email,
                        status: req.body.status
                    }).save()
                        .then(result => {
                            res.status(201).json({success: true, message: 'Created'})
                        })
                        .catch(e => {
                            helper.errorHandler(res, e)
                        });
                }
            })
            .catch(e => helper.errorHandler(res, e))
    },

    updateClient(req, res, next) {
        Client.findOneAndUpdate({_id : req.params.id},req.body)
            .exec()
            .then(client => {
                res.status(200).json({
                    success: true
                })
            })
            .catch(e => helper.errorHandler(res, e))
    },

    createPasswordAndSend(req, res, next) {
        const password = randomsPass.generate({
            length: 12,
            charset: 'hex'
        });
        console.log('password', password);
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                res.status(500).json({error: err});
            } else {
                Client.findOneAndUpdate({_id: req.params.id}, {password: hash})
                    .exec()
                    .then(r => {
                        console.log('client', r);
                        if (r) {
                            let html = `<a href="http://localhost:3000/cabinet/${r.nikName}">Your cabinet here</a> <br> <p>your Password is: ${password}</p>`;
                            helper.sendAccount(res, html, r.email);
                        } else {
                            res.status(404).json({success: false, error: 'Not found !!!'})
                        }
                    })
                    .catch(e => helper.errorHandler(res, e))

            }
        })
    },

    login(req, res, next) {
        Client.findOne({email: req.body.email, nikName: req.body.nikName})
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
                            bcrypt.hash(req.body.password, 10, (err, hash) => {
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