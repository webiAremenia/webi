// const Team = require('../models/Team');
const fs = require('fs');
import Team from '../models/Team'

module.exports.getAll = (req, res) => {
    const teams = Team.find({}).sort({sort: 1})
        .then(result => {
            res.status(200).json({
                success: true,
                teams: result
            })
        })
        .catch(e => console.log(e))
};

module.exports.getOne = (req, res) => {
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


module.exports.create = (req, res) => {
    if (!req.file) {
        return res.status(500).json({
            success: false,
            msg: "error"
        })
    }

    const team = new Team({
        avatar: req.file.filename,
        fullName: JSON.parse(req.body.fullName),
        position: JSON.parse(req.body.position),
        info: JSON.parse(req.body.info),
        sort: req.body.sort
    });
    team.save()
        .then(result => {
            res.status(201).json({
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

module.exports.update = (req, res) => {
    let update = req.body;
    if (!req.body) {
        return res.status(400).send({
            msg: "Portfolio content can not be empty"
        });
    } else {
        if (req.file) {
            // console.log(1)
            update.avatar = req.file.filename;
        }
        if (req.body.fullName) {
            // console.log(2)
            update.fullName = JSON.parse(req.body.fullName)
        }
        if (req.body.position) {
            // console.log(3)
            update.position = JSON.parse(req.body.position)
        }
        if (req.body.info) {
            // console.log(3)
            update.info = JSON.parse(req.body.info)
        }
    }

    Team.findByIdAndUpdate({_id: req.params.id}, update)
        .then(result => {
            if (!result) {
                res.status(404).json({
                    success: false,
                    error: "Team not found with id " + req.params.id
                })
            } else {
                if (req.file) {
                    fs.unlink(__dirname + `/../../_uploads/team/${result.avatar}`, (err) => {
                        if (err) {
                            console.log(err)
                        }
                    });
                }
                res.status(200).json({
                    success: true,
                    msg: "Team deleted successfully!"
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

module.exports.updateList = (req, res) => {
    let update = {};

    for (let i in req.body) {
        update.sort = i;
        Team.findByIdAndUpdate({_id: req.body[i]}, update)
            .then(result => {
                console.log('Result ', result)
            })
            .catch(err => {
                return res.status(500).send({
                    success: false,
                    error: err.message,
                });
            });
    }
};

module.exports.delete = (req, res) => {

    Team.findByIdAndRemove({_id: req.params.id})
        .then(result => {
            if (!result) {

                res.status(404).json({
                    success: false,
                    msg: "Team not found with id " + req.params.id
                })
            } else {
                fs.unlink(__dirname + `/../../_uploads/team/${result.avatar}`, (err) => {
                    if (err) {
                        console.log(err)
                    }
                });
                res.status(200).json({
                    success: true,
                    msg: "Team deleted successfully!",
                    result: result
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

