const {check} = require('express-validator');
const studentModel = require('../models/Student');



const validator = [
    check('firstName')
    .not()
    .trim()
    .isEmpty()
    .withMessage("Enter your first name")
    .isLength({min:2, max:15})
    .withMessage("First Name's character must be 2 - 15"),

    check('lastName')
    .not()
    .trim()
    .isEmpty()
    .withMessage("Enter your Last name")
    .isLength({min:2, max:15})
    .withMessage("Last Name's character must be 2 - 15"),

    check('collegeName')
    .not()
    .trim()
    .isEmpty()
    .withMessage("Enter your College name")
    .isLength({min:5, max:50})
    .withMessage("College Name's character must be 5 - 50"),

    check('address')
    .not()
    .trim()
    .isEmpty()
    .withMessage("Enter your address")
    .isLength({min:5, max:50})
    .withMessage("Address's character must be 5 - 50"),

    check('sessionName')
    .not()
    .trim()
    .isEmpty()
    .withMessage("Enter your session name")
    .isLength({min:2, max:35})
    .withMessage("Session's character must be 2 - 35"),

    check('email')
    .isEmail()
    .withMessage("please provide a valid email")
    .normalizeEmail()
    .custom( async (val, {req}) => {
        const getEmail = await studentModel.findOne({email: `${val}`});
        if(getEmail){
            throw new Error("This email is already used by someone!")
        }
        return true
    }),

    check('phone')
    .not()
    .trim()
    .isEmpty()
    .withMessage("Please provide your Phone Number")
    .isLength({min:11, max:15})
    .withMessage("Phone number's character must be 11 - 15")
    .custom( async (val, {req}) => {
        const getPhone = await studentModel.findOne({phone: `${val}`});
        if(getPhone){
            throw new Error("This phone number is already used by someone!")
        }
        return true
    }),

    check('password')
    .not()
    .isEmpty()
    .withMessage("Please provide a strong password")
    .isLength({min:5, max:30})
    .withMessage("Please choose a password between 5 to 30 characters"),

    check('confirmPassword')
    .not()
    .isEmpty()
    .withMessage("Please Confirm your password")
    .custom( async (val, {req}) => {
        const getPassword = await req.body.password;
        if(getPassword !== val){
            throw new Error("Password does not match!");
        }
        return true;
    })
];



module.exports = validator;
