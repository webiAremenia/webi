import Page from '@admin/models/Page';

module.exports.getAll = (req, res) => {
    Page.find({})
        .then(result => {
            res.status(200).json({
                success: true,
                data: result
            })
        })
        .catch(e => console.log(e))
};

module.exports.getOne =  (req, res) => {
    Page.findOne({_id: req.params.id})
        .then(result => {
            if (!result) {
                res.status(404).json({
                    success: false,
                    msg: "Page not found with id " + req.params.id
                })
            } else {
                res.status(200).json({
                    success: true,
                    data: result
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

