import fs from 'fs';
import multer from 'multer';

const uploads = '/../../../_uploads';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(__dirname + uploads)) {
            fs.mkdirSync(__dirname + uploads);
        }
        if (!fs.existsSync(__dirname + uploads + '/media')) {
            fs.mkdirSync(__dirname + uploads + '/media');
        }


        if (!fs.existsSync(__dirname + uploads + '/page')) {
            fs.mkdirSync(__dirname + uploads + '/page');
        }
        if (!fs.existsSync(__dirname + uploads + '/page/ckeditor')) {
            fs.mkdirSync(__dirname + uploads + '/page/ckeditor');
        }


        if (!fs.existsSync(__dirname + uploads + '/news')) {
            fs.mkdirSync(__dirname + uploads + '/news');
        }
        if (!fs.existsSync(__dirname + uploads + '/news/ckeditor')) {
            fs.mkdirSync(__dirname + uploads + '/news/ckeditor');
        }


        if (!fs.existsSync(__dirname + uploads + '/portfolio')) {
            fs.mkdirSync(__dirname + uploads + '/portfolio');
        }
        if (!fs.existsSync(__dirname + uploads + '/portfolio/ckeditor')) {
            fs.mkdirSync(__dirname + uploads + '/portfolio/ckeditor');
        }


        if (!fs.existsSync(__dirname + uploads + '/team')) {
            fs.mkdirSync(__dirname + uploads + '/team');
        }

        if (req.originalUrl.split('/')[2] === 'media') {
            cb(null,__dirname + uploads + '/media');
        }

        if (req.originalUrl.split('/')[2] === 'portfolio') {
            // console.log(3333333)
            if (req.originalUrl.split('/')[3] === 'ckeditor' && req.method === 'POST') {
                // console.log(4444)
                if (!fs.existsSync(__dirname + uploads + '/portfolio/ckeditor/' + req.body.dirName)) {
                    // console.log(55555)
                    fs.mkdirSync(__dirname + uploads + '/portfolio/ckeditor/' + req.body.dirName);
                }
                // console.log(66666666)
                cb(null, __dirname + uploads + '/portfolio/ckeditor/' + req.body.dirName);
            } else {
                cb(null, __dirname + uploads + '/portfolio');
            }
        }

        if (req.originalUrl.split('/')[2] === 'page') {
            // console.log(3333333)
            if (req.originalUrl.split('/')[3] === 'ckeditor' && req.method === 'POST') {
                // console.log(4444)
                if (!fs.existsSync(__dirname + uploads + '/page/ckeditor/' + req.body.dirName)) {
                    // console.log(55555)
                    fs.mkdirSync(__dirname + uploads + '/page/ckeditor/' + req.body.dirName);
                }
                // console.log(66666666)
                cb(null, __dirname + uploads + '/page/ckeditor/' + req.body.dirName);
            } else {
                cb(null, __dirname + uploads + '/page');
            }
        }

        if (req.originalUrl.split('/')[2] === 'news') {
            // console.log(3333333)
            if (req.originalUrl.split('/')[3] === 'ckeditor' && req.method === 'POST') {
                // console.log(4444)
                if (!fs.existsSync(__dirname + uploads + '/news/ckeditor/' + req.body.dirName)) {
                    // console.log(55555)
                    fs.mkdirSync(__dirname + uploads + '/news/ckeditor/' + req.body.dirName);
                }
                // console.log(66666666)
                cb(null, __dirname + uploads + '/news/ckeditor/' + req.body.dirName);
            } else {
                cb(null, __dirname + uploads + '/news');
            }
        }

        if (req.originalUrl.split('/')[2] === 'team') {
            cb(null, __dirname + uploads + '/team');
        }

    },
    filename: function (req, file, cb) {
        if (req.originalUrl.split('/')[3] !== 'ckeditor') {
            // console.log(111111)
            cb(null, new Date().getTime().toString() + file.originalname)
        } else {
            // console.log(222222)
            cb(null, req.body.random + file.originalname)
        }
    }
});


const upload = multer({
    storage: storage,
    limits: 1024 * 1024 * 5
});

module.exports = upload;
