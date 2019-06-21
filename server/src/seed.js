import Admin from './admin/models/admin';
import Settings from './admin/models/Setting';
import bcrypt from "bcrypt";

module.exports.createDef = () => {
    Admin.find().then(a => {
        if (a.length < 1) {
            bcrypt.hash('111111', 10, (err, hash) => {
                if (err) {
                    console.log(err);
                } else {
                    const admin = new Admin({
                        firstName: 'Admin',
                        lastName: 'A.',
                        email: 'admin@mail.ru',
                        password: hash,
                    });
                    admin.save()
                        .then(result => {
                            console.log('Admin created');
                        })
                        .catch(e => {
                            console.log(e)
                        });
                }
            });
        }
    });

    Settings.find().then(a => {
        if (a.length < 1) {
            new Settings({
                value: {
                    am: "",
                    ru: "",
                    en: "Some lorem text here "
                },
                key: "home-introduction-text",
            }).save()
                .then(r => console.log('---'))
                .catch(e => console.log(e));
            new Settings({
                value: {
                    am: "",
                    ru: "",
                    en: "Some lorem text here "
                },
                key: "home-introduction-title",
            }).save()
                .then(r => console.log('---'))
                .catch(e => console.log(e));
            new Settings({
                value: {
                    am: "",
                    ru: "",
                    en: "info@webi.com"
                },
                key: "form-email",
            }).save()
                .then(r => console.log('---'))
                .catch(e => console.log(e))
        }

    });
};
