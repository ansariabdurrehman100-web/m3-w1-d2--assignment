const express=require('express');
const { check, validationResult } = require('express-validator'); 
const router=express.Router();
router.get('/', function(req,res){
    res.render('form',{title:'Registration form'});
});

router.post('/',[check('name').isLength({min:1}).withMessage('Please Enter a name'),
    check('email').isEmail()
      .withMessage('Please enter a valid email'),
], function(req,res){
    //console.log(req.body);
    const errros=validationResult(req);
    if (errros.isEmpty()){
        res.send('Thank you for your registration');
    }else{
        res.render('form',{title:'Registration form',
            errros:errros.array(),data: req.body,data: req.body || {} 
        });
    }
    
});

module.exports=router;