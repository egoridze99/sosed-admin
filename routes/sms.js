const router = require('express').Router();
const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth');
const smsRu = require('sms_ru');

const fs = require('fs');

const sms = new smsRu('7CEF047D-F5C4-41AF-966A-B12EA5B3106F');


const Telefone = require('../models/Telefone');

router.post('/send', ensureAuthenticated, async (req, res) => {
    const telephones = await Telefone.find({});

    telephones.forEach(item => {
      sms.sms_send({
        to: item.telefone,
        text: req.body.text
      }, function(e){
        res.send(JSON.stringify({status : 'ok'}));
      });
    })
})

module.exports = router;