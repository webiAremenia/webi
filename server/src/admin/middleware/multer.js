const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(__dirname + '/../../_uploads')) {
            fs.mkdirSync(__dirname + '/../../_uploads');
        }
        if (!fs.existsSync(__dirname + '/../../_uploads/media')) {
            fs.mkdirSync(__dirname + '/../../_uploads/media');
        }
        //
        if (!fs.existsSync(__dirname + '/../../_uploads/page')) {
            fs.mkdirSync(__dirname + '/../../_uploads/page');
        }

        if (!fs.existsSync(__dirname + '/../../_uploads/portfolio')) {
            fs.mkdirSync(__dirname + '/../../_uploads/portfolio');
        }
        if (!fs.existsSync(__dirname + '/../../_uploads/team')) {
            fs.mkdirSync(__dirname + '/../../_uploads/team');
        }

        if (req.originalUrl.split('/')[2] === 'media') {
            cb(null, __dirname + '/../../_uploads/media');
        }
        if (req.originalUrl.split('/')[2] === 'page') {
            cb(null, __dirname + '/../../_uploads/page');
        }
        if (req.originalUrl.split('/')[2] === 'portfolio') {
            cb(null, __dirname + '/../../_uploads/portfolio');
        }
        if (req.originalUrl.split('/')[2] === 'team') {
            cb(null, __dirname + '/../../_uploads/team');
        }

    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime().toString() + file.originalname)
    }
});


const upload = multer({
    storage: storage,
    limits: 1024 * 1024 * 5
});

module.exports = upload;
