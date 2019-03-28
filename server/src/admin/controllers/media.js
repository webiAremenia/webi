const Media = require('../models/Media');
const fs = require('fs');
const jwt = require('jsonwebtoken');

module.exports.getAll = (req, res) => {
    const medias = Media.find({})
        .then(result => {
            res.status(200).json({
                success: true,
                medias: result
            })
        })
        .catch(err => {
            return res.status(500).send({
                success: false,
                error: err.message,
            });
        })
};

module.exports.getOne = (req, res) => {
    Media.findOne({_id: req.params.id})
        .then(result => {
            if (!result) {
                res.status(404).json({
                    success: false,
                    msg: `Media not found with id  ${req.params.id}`
                })
            } else {
                res.status(200).json({
                    success: false,
                    media: result
                })
            }
        })
        .catch(err => {
            return res.status(500).send({
                success: false,
                error: err.message,
            });
        });
};


module.exports.create = (req, res) => {
    if (!req.file) {
        return res.status(500).json({
            error: 'file required'
        })
    }
    const media = new Media({
        category: req.body.category,
        image: req.file.filename,
        alt: JSON.parse(req.body.alt),
    });
    media.save()
        .then(result => {
            res.status(200).json({
                success: true,
                portfolio: result
            })
        })
        .catch(err => {
            return res.status(500).send({
                success: false,
                error: err.message
            });
        });
};

module.exports.update = async (req, res) => {
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
        if (req.body.alt) {
            // console.log(2)
            update.alt = JSON.parse(req.body.alt)
        }


    }

    Media.findByIdAndUpdate({_id: req.params.id}, update)
        .then(result => {
            if (!result) {
                res.status(404).json({
                    success: false,
                    error: "Media not found with id " + req.params.id
                })
            } else {
                if (req.file) {
                    fs.unlink(__dirname + `/../../_uploads/media/${result.image}`, (err) => {
                        if (err) {
                            console.log(err)
                        }
                    });
                }
                res.status(200).json({
                    success: true,
                    msg: "Media deleted successfully!"
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
            Media.findByIdAndRemove({_id: req.params.id})
                .then(result => {
                    if (!result) {

                        res.status(404).json({
                            success: false,
                            msg: "Media not found with id " + req.params.id
                        })
                    } else {
                        fs.unlink(__dirname + `/../../_uploads/media/${result.image}`, (err) => {
                            if (err) {
                                console.log(err)
                            }
                        });
                        res.status(200).json({
                            success: true,
                            msg: "Media deleted successfully!",
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
        } else {
            res.status(200).json({
                success: false,
                msg: "You are not admin"
            })
        }
    });

};

