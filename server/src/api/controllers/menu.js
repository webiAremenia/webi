import Menu from '@admin/models/Menu';

module.exports.getAll = (req, res) => {
    Menu.find()
        .sort('order')
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
    Menu.findOne({_id: req.params.id})
        .then(result => {
            if (!result) {
                res.status(404).json({
                    success: false,
                    msg: `Menu not found with id  ${req.params.id}`
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
};


