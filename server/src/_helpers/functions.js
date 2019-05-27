import nodeMailer from 'nodemailer';
import Setting from '../admin/models/Setting';
import 'babel-polyfill';

module.exports = {
    errorHandler(res, e) {
        res.status(500).json({
            error: e.message
        });
    },
    sendMail: (res, from, html) => {
        res.status(200).json({success: true});
        Setting.findOne({key: 'form-email'}).exec()
            .then(set => {
                if (set) {
                    let transporter = nodeMailer.createTransport({
                        host: 'smtp.gmail.com',
                        port: 465,
                        secure: true,
                        auth: {
                            user: 'hayrapet2013@gmail.com',
                            pass: '392175art'
                        }
                    });
                    let mailOptions = {
                        from: '', // sender address
                        to: set.value.en, // list of receivers
                        subject: 'WEBI contact form "' + from + '"', // Subject line
                        // text: content, // plain text body
                        html: html // html body
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log(error);
                            return res.status(500).json({success: false, message: error.message});
                        }
                        console.log('Message %s sent: %s', info.messageId, info.response);
                        res.status(200).json({success: true});
                    });
                } else {
                    return res.status(500).json({success: false, error: 'Cant find email for send !!!'});
                }
            })
            .catch(e => this.errorHandler(res, e));

    },
    sendAccount: (res, html, to) => {
        res.status(200).json({success: true});
        let transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'hayrapet2013@gmail.com',
                pass: '392175art'
            }
        });
        let mailOptions = {
            from: '', // sender address
            to: to, // list of receivers
            subject: 'WEBI authorization account', // Subject line
            html: html // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({success: false, error: error.message});
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
            res.status(200).json({success: true});
        });
    }
};
