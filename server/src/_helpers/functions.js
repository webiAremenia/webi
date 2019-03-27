exports.errorHandler = (res, e) => {
    res.status(500).json({
        success: false,
        error: e.message
    });
};

exports.idSubscriber = (req) => {
    return req.userData ? req.userData.userId : req.params.userId ;
};

module.exports.handleReqData = (req, res, canUpdate) => {
    let updateObject = {};
    if (JSON.stringify(req.body) === '{}' && !req.file) {
        return res.status(400).json({success: false, error: 'No data for update !!!'});
    }
    for (let el in req.body) {
        if (canUpdate.includes(el)) {
            updateObject[el] = req.body[el];
        }
    }
    if (req.file) {
        updateObject.avatar = req.file.filename;
    }
    if (JSON.stringify(updateObject) === '{}') {
        return res.status(400).json({success: false, error: 'Bad Request !!!'});
    }
    return updateObject;
};
