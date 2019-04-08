// const Menu = require('../models/Menu');
// const Page = require('../models/Page');
// const Category = require('../models/Category');

import Menu from '../models/Menu';
import Page from '../models/Page';
import Category from '../models/Category';
const fs = require('fs');



module.exports.getAll = (req, res) => {
    Menu.find()
        .sort('order')
        .then(result => {
            res.status(200).json({
                success: true,
                menus: result
            })
        })
        .catch(err => {
            return res.status(500).send({
                success: false,
                error: err.message,
            });
        })
};

module.exports.getPagesAndCategories = (req,res)=>{
    // let data = {
    //     page : '',
    //     category : ''
    // };
    Page.find({},'_id title')
        .then(page => {
            Category.find({},'_id name')
                .then(category => {
                    res.status(200).json({
                        success: true,
                        data: {
                            page : page,
                            category : category
                        }
                    })
                })
        })
        .catch(err => {
            return res.status(500).send({
                success: false,
                error: err.message,
            });
        });

    // Category.find({},'_id name')
    //     .then(result => {
    //         res.status(200).json({
    //             success: true,
    //             data: result
    //         })
    //     })
    //     .catch(err => {
    //         return res.status(500).send({
    //             success: false,
    //             error: err.message,
    //         });
    //     });
};

module.exports.getOne = (req, res) => {
    Menu.findOne({_id: req.params.id})
        .then(result => {
            if (!result) {
                res.status(404).json({
                    success: false,
                    msg: `Menu not found with id  ${req.params.id}`
                })
            } else {
                res.status(200).json({
                    success: false,
                    menu: result
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
    console.log(req.body);

    const menu = new Menu({
        title: req.body.title,
        type: req.body.type,
        typeId: req.body.typeId,
        order: req.body.order,
        parent: req.body.parent,
    });
    menu.save()
        .then(result => {
            res.status(201).json({
                success: true,
                menu: result
            })
        })
        .catch(err => {
            return res.status(500).send({
                success: false,
                error: err.message
            });
        });
};

module.exports.update = (req, res) => {
    let update = req.body;

    // if (!req.body) {
    //     return res.status(400).send({
    //         msg: "Portfolio content can not be empty"
    //     });
    // } else {
    //     if (req.file) {
    //         // console.log(1)
    //         update.image = req.file.filename;
    //     }
    //     if (req.body.alt) {
    //         // console.log(2)
    //         update.alt = JSON.parse(req.body.alt)
    //     }
    //
    //
    // }

    Menu.findByIdAndUpdate({_id: req.params.id}, update)
        .then(result => {
            if (!result) {
                res.status(404).json({
                    success: false,
                    error: "Menu not found with id " + req.params.id
                })
            } else {
                res.status(200).json({
                    success: true,
                    msg: "Menu updated successfully!"
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

module.exports.updateMenu = (req,res)=>{
    let update = {};

   for(let i = 0; i < req.body.data.length; ++i){

        // update = req.body.data[i];
        // update.order = i;
       update = {
           id : req.body.data[i].id,
           parent : req.body.data[i].parent,
           order : i
       };
       // console.log('body ', req.body.data[i]);
       // console.log('update ', update);

       Menu.findByIdAndUpdate({_id: req.body.data[i].id}, update)
            .then(result => {
                res.status(200).json({
                    success : true,
                    msg : "updated"
                })
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
    Menu.findByIdAndRemove({_id: req.params.id})
        .then(result => {
            if (!result) {

                res.status(404).json({
                    success: false,
                    msg: "Menu not found with id " + req.params.id
                })
            } else {
                res.status(200).json({
                    success: true,
                    msg: "Menu deleted successfully!",
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

