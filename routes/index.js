const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
const auth=require('http-auth');
const Registration = require('../models/Registration');

const basic=auth.basic({
    file: path.join(__dirname,'../users.htpasswd'),
});

const { check, validationResult } = require('express-validator'); 

// const Registration=mongoose.model('Registration');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('form', { title: 'Registration form', data: {}, errors: [] });
});


router.post('/',[check('name').isLength({min:1}).withMessage('Please Enter a name'),
    check('email').isEmail()
      .withMessage('Please enter a valid email'),
], function(req,res){
    
    const errors=validationResult(req);
    if (errors.isEmpty()){
        const registration=new Registration(req.body);
        registration.save().then(()=>res.send('Thank you for your registration'))
        .catch((err)=>{
            console.log(err);
            res.send('Sorry something went wrong');
            }
        );
        
        
    }else{
        res.render('form',{title:'Registration form',
            errors:errors.array(),data: req.body || {} 
        });
    }
    
});

router.get('/registration', function(req,res){
    Registration.find()
.then((registrations)=>{
    res.render('index', { title: 'Listing Registrations', registrations });
}).catch(()=>{
        res.send('Sorry Something went wrong')
    });
});

module.exports=router;