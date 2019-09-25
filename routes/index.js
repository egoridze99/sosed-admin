const router = require('express').Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth');
const bcrypt = require('bcryptjs');

const Buyer = require('../models/Buyer');
const Telefone = require('../models/Telefone');
const Transaction = require('../models/Transaction');
const Saler = require('../models/Saler');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', forwardAuthenticated, (req, res) => {
    res.render('login');
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    Saler.find({}, null, null)
        .then(arr => {
            res.render('dashboard', {
                salers: arr,
                show: ''
            })
        });
});

router.post('/saler/new-saler', (req, res) => {
    Saler.findOne({ login: req.body.login })
        .then(user => {
            if (!user) {
                const newSaler = new Saler({
                    _id: new mongoose.Types.ObjectId(),
                    name: {
                        firstName: req.body.name,
                        lastName: req.body.surname
                    },
                    login: req.body.login,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newSaler.password, salt, (err, hash) => {
                        if (err) throw err;

                        newSaler.password = hash;

                        newSaler.save()
                            .then(user => console.log('Succesly added to database'))
                            .then(() => {
                                res.send(JSON.stringify({status : 'ok', id : newSaler._id}))
                            })
                            .catch(error => {
                                res.send(JSON.stringify({status : 'error', msg : 'Непредвиденная ошибка'}));
                            })
                    })
                })
            } else {
                res.send(JSON.stringify({status : 'error', msg : 'Пользователь уже зарегестрирован'}));
            }
        })
        .catch(err => console.error(err))
});

router.post('/saler/delete-saler', (req, res) => {
    const id = req.body.id;

    console.log(id);

    Saler.findByIdAndDelete(id)
        .then(() => {
            res.send(JSON.stringify({status : 'ok'}));
        })
        .catch(err => {
            console.error(err);

            res.send(JSON.stringify({status : 'error'}));
        });
});

module.exports = router;