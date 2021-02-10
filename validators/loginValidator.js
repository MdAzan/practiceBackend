const {check} = require('express-validator');
const studentModel = require('../models/Student');


const loginValidation = [
    check('emailPhone')
    .not()
    .isEmpty()
    .withMessage("Please provide a valid email or phone Number")
    .custom(async (val) => {
        const email = await studentModel.findOne({email: `${val}`});
        const phone = await studentModel.findOne({phone: `${val}`});
        if(!email && !phone){
            throw new Error("Maybe email or phone number is wrong");
        }
        return true
    }),


    check('password')
    .not()
    .isEmpty()
    .withMessage('Password can\'t be empty')
    .custom(async (val, {req}) => {
        const email = await studentModel.findOne({email: `${req.body.emailPhone}`}, (err, data) => {
            if(!err){ Promise.resolve(data) }
        });

        const phone = await studentModel.findOne({phone: `${req.body.emailPhone}`}, (err, data) => {
            if(!err){ Promise.resolve(data) }
        });

        if(!email && !phone){
            throw new Error(`Nothing found`);
        }
        if(email){
            if(email.password !== val)
            throw new Error('password does not match')
        }
        if(phone){
            if(phone.password !== val)
            throw new Error('password does not match')
        }
        return true
    })
]



module.exports = loginValidation;
