const router = require('express').Router();
const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth');

const Transaction = require('../models/Transaction');

router.get('/day', ensureAuthenticated, (req, res) => {
    res.render('statistic', {
        activeLink : 'statistic'
    })
});


router.post('/day', ensureAuthenticated, (req, res) => {
    let date = new Date(req.body.date);
    let nextDate = new Date(req.body.date);

    nextDate.setDate(date.getDate()+2);

    console.log(date);
    console.log(nextDate);

    Transaction.find({date : {$gt : date, $lt : nextDate}})
        .then(transactions => {
            res.send(JSON.stringify(transactions))
        })
});

module.exports = router;