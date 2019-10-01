const router = require('express').Router();
const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth');

const Transaction = require('../models/Transaction');
const Saler = require('../models/Saler');

router.get('/day', ensureAuthenticated, (req, res) => {
    res.render('statisticDay', {
        activeLink : 'statistic'
    })
});


router.post('/day', ensureAuthenticated, (req, res) => {
    let date = new Date(req.body.date);
    let nextDate = new Date(req.body.date);

    nextDate.setDate(date.getDate()+1);

    let salers = {};
    let amountOfFree = 0;
    let amountSum = 0;
    let amountLitres = 0;

    Saler.find({}, null, null)
        .then(DBSalers => {
            DBSalers.forEach(saler => {
                salers[`${saler.name.lastName}`] = 0;
            });

            Transaction.find({date : {$gt : date, $lt : nextDate}})
            .then(transactions => {
                transactions.forEach(transaction => {
                    if (transaction.getFree === true) amountOfFree += 1;
                    amountSum += transaction.totalSum;
                    amountLitres += transaction.litres;
                    salers[transaction.saler.surname] += transaction.litres; 
                })
                let bestSaler;
                let maxLitres = 0;
                for (let key in salers) {
                    if (salers[key] > maxLitres) {
                        maxLitres = salers[key];
                        bestSaler = key;
                    }
                };
                res.send(JSON.stringify({
                    transactions,
                    amountOfFree,
                    amountSum,
                    amountLitres,
                    bestSaler,
                    maxLitres
                }));
            })
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
});

router.get('/month', ensureAuthenticated, (req, res) => {
    res.render('statisticMonth', {
        activeLink : 'statistic'
    })
});

router.post('/month', ensureAuthenticated, (req, res) => {
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);

    let salers = {};
    let amountOfFree = 0;
    let amountSum = 0;
    let amountLitres = 0;

    Saler.find({}, null, null)
        .then(DBSalers => {
            DBSalers.forEach(saler => {
                salers[`${saler.name.lastName}`] = 0;
            });

            Transaction.find({date : {$gte : startDate, $lt : endDate}})
            .then(transactions => {
                transactions.forEach(transaction => {
                    if (transaction.getFree === true) amountOfFree += 1;
                    amountSum += transaction.totalSum;
                    amountLitres += transaction.litres;
                    salers[transaction.saler.surname] += transaction.litres; 
                })
                let bestSaler;
                let maxLitres = 0;
                for (let key in salers) {
                    if (salers[key] > maxLitres) {
                        maxLitres = salers[key];
                        bestSaler = key;
                    }
                };
                res.send(JSON.stringify({
                    transactions,
                    amountOfFree,
                    amountSum,
                    amountLitres,
                    bestSaler,
                    maxLitres
                }));
            })
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
});

router.get('/period', ensureAuthenticated, (req, res) => {
    res.render('statisticPeriod', {
        activeLink : 'statistic'
    })
});

router.post('/period', ensureAuthenticated, (req, res) => {
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);

    let salers = {};
    let amountOfFree = 0;
    let amountSum = 0;
    let amountLitres = 0;

    Saler.find({}, null, null)
        .then(DBSalers => {
            DBSalers.forEach(saler => {
                salers[`${saler.name.lastName}`] = 0;
            });

            Transaction.find({date : {$gte : startDate, $lte : endDate}})
            .then(transactions => {
                transactions.forEach(transaction => {
                    if (transaction.getFree === true) amountOfFree += 1;
                    amountSum += transaction.totalSum;
                    amountLitres += transaction.litres;
                    salers[transaction.saler.surname] += transaction.litres; 
                })
                let bestSaler;
                let maxLitres = 0;
                for (let key in salers) {
                    if (salers[key] > maxLitres) {
                        maxLitres = salers[key];
                        bestSaler = key;
                    }
                };
                res.send(JSON.stringify({
                    transactions,
                    amountOfFree,
                    amountSum,
                    amountLitres,
                    bestSaler,
                    maxLitres
                }));
            })
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
});

module.exports = router;