import Setting from '@admin/models/Setting';

module.exports.getAll = (req, res) => {
    Setting.find({})
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

