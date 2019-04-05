// const Setting = require('../models/Setting');
import Setting from '../models/Setting'

const fs = require('fs');

module.exports.getAll = (req, res) => {
    Setting.find({})
        .then(result => {
            res.status(200).json({
                success: true,
                settings: result
            })
        })
        .catch(err => {
            return res.status(500).send({
                success: false,
                error: err.message,
            });
        })
};

module.exports.getOne = async (req, res) => {
    Setting.findOne({_id: req.params.id})
        .then(result => {
            if (!result) {
                res.status(404).json({
                    success: false,
                    msg: "Setting not found with id " + req.params.id
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
    Setting.findOne({key: req.body.key})
        .then(key => {
            if (key) {
                return res.send({
                    success: false,
                    msg: "Try another key"
                });
            }
            else {

                const value = req.body.value;
                const setting = new Setting({
                    key: req.body.key,
                    value: value
                });
                setting.save()
                    .then(result => {
                        res.status(200).json({
                            success: true,
                            key: result
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

module.exports.update = async (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            msg: "Setting content can not be empty"
        });
    }
    Setting.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then(result => {
            if (!result) {
                res.status(404).json({
                    success: false,
                    error: "Setting not found with id " + req.params.id
                })
            } else {
                res.status(200).json({
                    success: true,
                    msg: "Setting deleted successfully!"
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

