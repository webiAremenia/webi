import helper from '@helpers/functions';

module.exports = {
    sendEmail: (req, res) => {
        const from = `${req.body.name} <${req.body.email}>`;
        const html  = `<span>Phone Number: </span> ${req.body.phone} <br> <span>Company Name: </span> ${req.body.company} <hr>`;
        helper.sendMail(res, from, html)
    }
};