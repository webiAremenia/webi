// const Category = require('../models/Category');

const fs = require('fs');
import Category from '../models/Category';


module.exports.getAll = (req, res) => {
    Category.find({})
        .then(result => {
            res.status(200).json({
                success: true,
                data: result
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
    Category.findOne({_id: req.params.id})
        .then(result => {
            if (!result) {
                res.status(404).json({
                    success: false,
                    msg: "Category not found with id " + req.params.id
                })
            } else {
                res.status(200).json({
                    success: false,
                    setting: result
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
    Category.findOne({'name.en': req.body.name.en})
        .then(name => {
            if (name) {
                return res.send({
                    success: false,
                    msg: "Try another name"
                });
            }
            else {
                const name = req.body.name;
                const category = new Category({
                    name: name
                });
                category.save()
                    .then(result => {
                        res.status(200).json({
                            success: true,
                            category: result
                        })
                    })
                    .catch(err => {
                        return res.status(500).send({
                            success: false,
                            error: err.message,
                        });
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

module.exports.update = (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            msg: "Category content can not be empty"
        });
    }
    Category.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then(result => {
            if (!result) {
                res.status(404).json({
                    success: false,
                    error: "Category not found with id " + req.params.id
                })
            } else {
                res.status(200).json({
                    success: true,
                    msg: "Category updated successfully!"
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
    Category.findByIdAndRemove({_id: req.params.id})
        .then(result => {
            if (!result) {

                res.status(404).json({
                    success: false,
                    msg: "Media not found with id " + req.params.id
                })
            } else {
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

};
