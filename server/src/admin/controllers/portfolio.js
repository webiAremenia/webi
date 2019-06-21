// const Portfolio = require('../models/Portfolio');
const fs = require('fs');
import Portfolio from '../models/Portfolio'

const rimraf = require("rimraf");


module.exports.getAll = (req, res) => {
    const portfolios = Portfolio.find({})
        .then(result => {
            res.status(200).json({
                success: true,
                portfolios: result
            })
        })
        .catch(e => console.log(e))
};

module.exports.getOne = (req, res) => {
    Portfolio.findOne({_id: req.params.id})
        .then(result => {
            if (!result) {
                res.status(404).json({
                    success: false,
                    msg: "Portfolio not found with id " + req.params.id
                })
            } else {
                res.status(200).json({
                    success: false,
                    portfolio: result
                })
            }
        })
        .catch(e => {
            return res.status(500).send({
                success: false,
                error: err.message,
            });
        });
};


module.exports.create = (req, res) => {
    if (!req.file) {
        return res.status(500).json({
            success: false,
            msg: "error"
        })
    }


    const portfolio = new Portfolio({
        url: req.body.url,
        image: req.file.filename,
        title: JSON.parse(req.body.title),
        description: JSON.parse(req.body.description),
        hover: JSON.parse(req.body.hover),
        shortDescription: JSON.parse(req.body.shortDescription),
        random: req.body.random
    });
    portfolio.save()
        .then(result => {
            res.status(201).json({
                success: true,
                portfolio: result
            })
        })
        .catch(err => {
            console.log('error');
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
        if (req.body.hover) {
            // console.log(3)
            update.hover = JSON.parse(req.body.hover)
        }
        if (req.body.shortDescription) {
            // console.log(3)
            update.shortDescription = JSON.parse(req.body.shortDescription)
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
                    fs.unlink(__dirname + `/../../_uploads/portfolio/${result.image}`, (err) => {
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
    Portfolio.findByIdAndRemove({_id: req.params.id})
        .then(result => {
            if (!result) {

                res.status(404).json({
                    success: false,
                    msg: "Portfolio not found with id " + req.params.id
                })
            } else {
                fs.unlink(__dirname + `/../../_uploads/portfolio/${result.image}`, (err) => {
                    if (err) {
                        console.log(err)
                    }
                });
                rimraf.sync(__dirname + `/../../_uploads/portfolio/ckeditor/${result.random}`);
                res.status(200).json({
                    success: true,
                    msg: "Portfolio deleted successfully!",
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

module.exports.ckEditorAddImage = (req, res) => {
    // console.log('eeeeeeeeeeeeeee' + req.file.filename)
    res.status(201).json({
        filename: req.file.filename
    })
}

module.exports.ckEditorDeleteImage = (req, res) => {
    let name = req.query.name;
    fs.unlinkSync(__dirname + `/../../_uploads/portfolio/ckeditor/${name}`);
    res.status(201).json({
        msg: 'CkImage has been removed'
    })
};
module.exports.deleteNoEmptyDir = (req, res) => {
    rimraf.sync(__dirname + `/../../_uploads/portfolio/ckeditor/${req.params.dir}`);
}

