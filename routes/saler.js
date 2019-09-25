const router = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {forwardAuthenticated ,ensureAuthenticated} = require('../config/auth');

const Saler = require('../models/Saler');

router.post('/saler/new-saler', (req, res) => {
    console.log(req.body);
})

module.exports = router;