import Language from '../models/Language';

module.exports.getAll = (req, res) => {
    Language.find({})
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
    Language.findOne({_id: req.params.id})
        .then(result => {
            if (!result) {
                res.status(404).json({
                    success: false,
                    msg: "Language not found with id " + req.params.id
                })
            } else {
                res.status(200).json({
                    success: false,
                    language: result
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
    Language.findOne({value: req.body.value})
        .then(language => {
            if (language) {
                return res.send({
                    success: false,
                    msg: "Try another language"
                });
            }
            else {

                const language = new Language({
                    value : req.body.value,
                    slug : req.body.slug,
                    status : req.body.status,
                });
                language.save()
                    .then(result => {
                        res.status(200).json({
                            success: true,
                            language: result
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
    Language.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then(result => {
            if (!result) {
                res.status(404).json({
                    success: false,
                    error: "Language not found with id " + req.params.id
                })
            } else {
                res.status(200).json({
                    success: true,
                    msg: "Language updated successfully!"
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
    Language.findByIdAndRemove({_id: req.params.id})
        .then(result => {
            if (!result) {

                res.status(404).json({
                    success: false,
                    msg: "Language not found with id " + req.params.id
                })
            } else {
                res.status(200).json({
                    success: true,
                    msg: "Language deleted successfully!",
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
