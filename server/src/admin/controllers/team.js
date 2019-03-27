const Team = require('../models/Team');
const fs = require('fs');
const jwt = require('jsonwebtoken');

module.exports.getAll = (req, res) => {
    const teams = Team.find({})
        .then(result => {
            res.status(200).json({
                success: true,
                teams: result
            })
        })
        .catch(e => console.log(e))
};

module.exports.getOne =  (req, res) => {
    // Team.findOne({_id: req.params.id})
    //     .then(result => {
    //         if (!result) {
    //             res.status(404).json({
    //                 success: false,
    //                 msg: "Team not found with id " + req.params.id
    //             })
    //         } else {
    //             res.status(200).json({
    //                 success: false,
    //                 team: result
    //             })
    //         }
    //     })
    //     .catch(e => {
    //         return res.status(500).send({
    //             success: false,
    //             error: err.message,
    //         });
    //     });
};


module.exports.create =  (req, res) => {
    if (!req.file) {
        return res.status(500).json({
            success : false,
            msg : "error"
        })
    }

    console.log(req.body);

    const team = new Team({
        avatar: req.file.filename,
        fullName: JSON.parse(req.body.fullName),
        position: JSON.parse(req.body.position),
        info: JSON.parse(req.body.info),
        sort : req.body.sort
    });
    team.save()
        .then(result => {
            res.status(200).json({
                success: true,
                team: result
            })
        })
        .catch(err => {
            console.log('error')
            return res.status(500).send({
                success: false,
                error: err.message,
            });
        });
};

module.exports.update =  (req, res) => {
    let update = req.body;
    if (!req.body) {
        return res.status(400).send({
            msg: "Portfolio content can not be empty"
        });
    } else {
        if (req.file) {
            // console.log(1)
            update.image = req.file.filename;
        }
        if (req.body.description) {
            // console.log(2)
            update.description = JSON.parse(req.body.description)
        }
        if (req.body.title) {
            // console.log(3)
            update.title = JSON.parse(req.body.title)
        }
    }

    Portfolio.findByIdAndUpdate({_id: req.params.id}, update)
        .then(result => {
            if (!result) {
                res.status(404).json({
                    success: false,
                    error: "Portfolio not found with id " + req.params.id
                })
            } else {
                if (req.file) {
                    fs.unlink(`./public/assets/img/portfolio/${result.image}`, (err) => {
                        if (err) {
                            console.log(err)
                        }
                    });
                }
                res.status(200).json({
                    success: true,
                    msg: "Portfolio deleted successfully!"
                });
            }
        })
        .catch(err => {
            return res.status(500).send({
                success: false,
                error: err.message,
            });
        });
};

module.exports.delete = (req, res) => {
    const token = req.headers.authorization.replace('Bearer ', '');
    jwt.verify(token, 'secret', function (err, decoded) {
        if (decoded.role == 'superadmin') {
            Team.findByIdAndRemove({_id: req.params.id})
                .then(result => {
                    if (!result) {

                        res.status(404).json({
                            success: false,
                            msg: "Team not found with id " + req.params.id
                        })
                    } else {
                        fs.unlink(`./public/assets/img/team/${result.avatar}`, (err) => {
                            if (err) {
                                console.log(err)
                            }
                        });
                        res.status(200).json({
                            success: true,
                            msg: "Team deleted successfully!",
                            result : result
                        });
                    }
                })
                .catch(err => {
                    return res.status(500).send({
                        success: false,
                        error: err.message,
                    });
                });
        } else {
            res.status(200).json({
                success: false,
                msg: "You are not admin"
            })
        }
    });

};

