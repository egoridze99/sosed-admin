const router = require('express').Router();
const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth');

const Saler = require('../models/Saler');

router.get('/', forwardAuthenticated, (req, res) => {
    res.render('login');
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    Saler.find({}, null, null)
        .then(arr => {
            res.render('dashboard', {
                salers: arr,
                activeLink : 'uchet'
            })
        });
});

router.get('/sms', ensureAuthenticated, (req, res) => {
    res.render('sms', {
        activeLink : 'sms'
    })
})

module.exports = router;