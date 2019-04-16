import helper from '../../_helpers/functions'

module.exports = {
    sendMail(req, res, next) {
        const from = req.body.email;
        const html  = `${req.body.message}`;
        helper.sendMail(res, from, html)
    }
};