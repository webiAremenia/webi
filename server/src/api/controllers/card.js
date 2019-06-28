import Card from '@admin/models/Card';

module.exports = {
    getAll: (req, res) => {
        Card.find({})
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
                        msg: "Card not found "
                    })
                } else {
                    res.status(200).json({
                        success: true,
                        data: result
                    })
                }
            })
            .catch(err => {
                return res.status(500).send({
                    success: false,
                    error: err.message,
                });
            });
    }
}
