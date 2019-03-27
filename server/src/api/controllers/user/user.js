import helper from "../../../_helpers/functions";
import User from '../../models/user/user';

const canUpdate = ['firstName', 'lastName', 'avatar'];

exports.signUp = function (req, res, next) {

    User.find({email: req.body.email, deleted: false}).exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    success: false,
                    error: 'user exist !!!'
                });
            } else {
                User.createUserAndSave(req, res);
            }
        });
};

exports.login = function (req, res, next) {
    User.find({email: req.body.email, deleted: false})
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    success: false,
                    error: 'Auth failed'
                });
            }
            User.checkPass(req.body.password, user[0], res)
        })
        .catch(e => helper.errorHandler(res, e));
};

exports.update = (req, res, next) => {
    const updateObject = helper.handleReqData(req, res, canUpdate);
    if ( updateObject.statusCode === 400) return;
    User.findByIdAndUpdate({_id: req.userData.userId, deleted: false}, updateObject)
    // .exec()
        .then(r => {
            if (updateObject.avatar && r.avatar !== null) {
                User.deleteAvatar(r.avatar);
            }
            res.status(200).json({
                success: true,
                message: 'User Updated !!!'
            })
        })
        .catch(e => {
            if (req.file) User.deleteAvatar(req.file.filename);
            helper.errorHandler(res, e);
        });
};

exports.findUser = (req, res, next) => {
    User.findById({_id: req.params.userId, deleted: false})
        .select('_id avatar firstName lastName email friends')
        .exec()
        .then(user => {
            res.status(200).json({
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                avatar: user.avatar,
                email: user.email,
                registrationDate: user.registration_date,
                friends: user.friends
            })
        })
        .catch(e => helper.errorHandler(res, e));
};

exports.getAllUsers = (req, res, next) => {
    User.find({deleted: false})
        .select('_id avatar firstName lastName email friends registration_date')
        .exec()
        .then(users => {
            res.status(200).json(users.map(user => {
                return {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    avatar: user.avatar,
                    email: user.email,
                    registrationDate: ((new Date()) - user.registration_date) / 60000,
                    friends: user.friends.length
                }
            }))
        })
        .catch(e => helper.errorHandler(res, e));
};

//====================================
//========== smart delete ============
//====================================

exports.delete = (req, res, next) => {

    User.findOneAndUpdate({_id: req.userData.userId, deleted: false}, {deleted: true, message: req.body.message})
        .select('_id avatar firstName lastName email friends registration_date')
        .exec()
        .then(r => {
            if (r) {
                r.friends.forEach(function (f) {
                    r.removeFriend(f._id)
                        .then(result => {
                            console.log(result)
                        })
                        .catch(e => helper.errorHandler(res, e))
                });
                return res.status(200).json({
                    message: 'User Deleted !!!'
                });
            }
            res.status(404).json({
                message: 'User Not Found !!!'
            })
        })
        .catch(e => {
            helper.errorHandler(res, e);
        });
};

