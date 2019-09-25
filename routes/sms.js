const router = require('express').Router();
const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth');

const Telefone = require('../models/Telefone');

router.post('/send', ensureAuthenticated, (req, res) => {
    console.log('*');
    res.send(JSON.stringify({status : 'ok'}));
})

module.exports = router;