const router = require('express').Router();
const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth');
const smsRu = require('sms_ru');

const sms = new smsRu('7CEF047D-F5C4-41AF-966A-B12EA5B3106F');


const Telefone = require('../models/Telefone');

router.post('/send', ensureAuthenticated, (req, res) => {
    sms.sms_send({
        to: '79141410483',
        text: req.body.text
      }, function(e){
        res.send(JSON.stringify({status : 'ok'}));
      });
})

module.exports = router;