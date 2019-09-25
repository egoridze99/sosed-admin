const router = require('express').Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {forwardAuthenticated ,ensureAuthenticated} = require('../config/auth');

const Buyer = require('../models/Buyer');
const Telefone = require('../models/Telefone');
const Transaction = require('../models/Transaction');
const Saler = require('../models/Saler');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.get('/', forwardAuthenticated, (req, res) => {
    res.render('login');
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    Saler.find({}, null, null)
        .then(arr => {
            res.render('dashboard', {
                salers : arr
            })
        });
});

module.exports = router;