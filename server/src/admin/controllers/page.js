// const Page = require('../models/Page');
const fs = require('fs');
import Page from '../models/Page'

module.exports.getAll = (req, res) => {
    const pages = Page.find({})
        .then(result => {
            res.status(200).json({
                success: true,
                data: result
            })
        })
        .catch(e => console.log(e))
};

module.exports.getOne = (req, res) => {
    Page.findOne({_id: req.params.id})
        .then(result => {
            if (!result) {
                res.status(404).json({
                    success: false,
                    msg: "Page not found with id " + req.params.id
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
    const page = new Page({
        title: JSON.parse(req.body.title),
        description: JSON.parse(req.body.description),
        content: JSON.parse(req.body.content),
        banner: req.file.filename
    });
    page.save()
        .then(result => {
            res.status(201).json({
                success: true,
                page: result
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

module.exports.update = async (req, res) => {
    let update = req.body;

    if (!req.body) {
        return res.status(400).send({
            msg: "Portfolio content can not be empty"
        });
    } else {
        if (req.file) {
            // console.log(1)
            update.banner = req.file.filename;
        }
        if (req.body.description) {
            // console.log(2)
            update.description = JSON.parse(req.body.description)
        }
        if (req.body.title) {
            // console.log(3)
            update.title = JSON.parse(req.body.title)
        }
        if (req.body.content) {
            // console.log(3)
            update.content = JSON.parse(req.body.content)
        }
    }

    Page.findByIdAndUpdate({_id: req.params.id}, update)
        .then(result => {
            if (!result) {
                res.status(404).json({
                    success: false,
                    error: "Page not found with id " + req.params.id
                })
            } else {
                if (req.file) {
                    fs.unlink(__dirname + `/../../_uploads/page/${result.banner}`, (err) => {
                        if (err) {
                            console.log(err)
                        }
                    });
                }
                res.status(200).json({
                    success: true,
                    msg: "Page deleted successfully!"
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
    Page.findByIdAndRemove({_id: req.params.id})
        .then(result => {
            if (!result) {

                res.status(404).json({
                    success: false,
                    msg: "Page not found with id " + req.params.id
                })
            } else {
                fs.unlink(__dirname + `/../../_uploads/page/${result.banner}`, (err) => {
                    if (err) {
                        console.log(err)
                    }
                });
                res.status(200).json({
                    success: true,
                    msg: "Page deleted successfully!",
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

