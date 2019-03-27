const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(req.originalUrl.split('/')[2] === 'portfolio'){
            cb(null, './public/assets/img/portfolio')
        }
        if(req.originalUrl.split('/')[2] === 'media'){
            cb(null, './public/assets/img/media')
        }
        if(req.originalUrl.split('/')[2] === 'page'){
            cb(null, './public/assets/img/page')
        }
        if(req.originalUrl.split('/')[2] === 'team'){
            cb(null, './public/assets/img/team')
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
