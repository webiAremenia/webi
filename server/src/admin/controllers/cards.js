import Card from '../models/Card';

module.exports = {
    getAll: (req, res) => {
        console.log(55)
        Card.find()
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
    },
    getOne: (req, res) => {
        Card.findOne({_id: req.params.id})
            .then(result => {
                if (!result) {
                    res.status(404).json({
                        success: false,
                        msg: "Card not found"
                    })
                } else {
                    res.status(200).json({
                        success: true,
                        card: result
                    })
                }
            })
            .catch(err => {
                return res.status(500).send({
                    success: false,
                    error: err.message,
                });
            });
    },
    create: (req, res) => {
        const card = {
            title: req.body.title,
            description: req.body.description,
            background: req.body.background,
            textColor: req.body.textColor,
            url: req.body.url
        };
        new Card(card).save()
            .then(result => {
                res.status(200).json({
                    success: true,
                    card: result
                })
            })
            .catch(err => {
                return res.status(500).send({
                    success: false,
                    error: err.message,
                });
            });
    },
    update: (req, res) => {

        if (!req.body) {
            return res.status(400).send({
                msg: "Card content can not be empty"
            });
        }
        Card.findByIdAndUpdate({_id: req.params.id}, req.body)
            .then(result => {
                if (!result) {
                    res.status(404).json({
                        success: false,
                        error: "Card not found"
                    })
                } else {
                    res.status(200).json({
                        success: true,
                        msg: "Card updated successfully!"
                    });
                }
            })
            .catch(err => {
                return res.status(500).send({
                    success: false,
                    error: err.message,
                });
            });
    },
    delete: (req, res) => {
        Card.findByIdAndRemove({_id: req.params.id})
            .then(result => {
                if (!result) {

                    res.status(404).json({
                        success: false,
                        msg: "Card not found"
                    })
                } else {
                    res.status(200).json({
                        success: true,
                        msg: "Card deleted successfully!",
                    });
                }
            })
            .catch(err => {
                return res.status(500).send({
                    success: false,
                    error: err.message,
                });
            });

    }
};
