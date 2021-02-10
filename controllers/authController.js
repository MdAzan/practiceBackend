// import node modules
const mongoose = require('mongoose');






// import local modules
const {validationResult} = require('express-validator');
const studentModel = require('../models/Student');






// 01 signupGetController
exports.signupGetController = (req, res, next) => {
    res.render('pages/auth/signup', {title:'Sign Up',err:{}, val:{}});
}




// signupPostController
exports.signupPostController = async (req,res,next) => {
    const {firstName,lastName,collegeName,sessionName,address,email,phone,password,confirmPassword} = req.body;
    let err = await validationResult(req).formatWith(er => er.msg);
    let notErr = await err.isEmpty();
    let errMsg = await err.mapped();
   
    if(notErr){
        const user = await new studentModel({
            firstName,lastName,collegeName,sessionName,address,email,phone,password
        })
        let result = await user.save();
        res.render('pages/auth/login', {title:"Log In", err:{}, val:{}});
    }else{
        console.log("some error")
        res.render('pages/auth/signup', {title: 'Try Againg to Sign Up',err:errMsg, val:{firstName,lastName,collegeName,sessionName,address,email,phone,password,confirmPassword}})
    }   
}






// loginGetController
exports.loginGetController = (req, res, next) => {
    res.render('pages/auth/login', {title: 'Log In', err:{}, val:{}});
}




// loginPostController
exports.loginPostController = async (req, res, next) => {
    const {emailPhone, password} = await req.body;
    let err = await validationResult(req).formatWith(er => er.msg);
    let errMsg = await err.mapped();
    const notErr = err.isEmpty();
    // find user
    let client = await studentModel.findOne({email : req.body.emailPhone});
    if(!client){
        client = await studentModel.findOne({phone: req.body.emailPhone})
    }

    if(notErr){
        // storing value in session
        req.session.isLoggedIn = true;
        req.session.user = true;
        req.session.name = `${client.firstName} ${client.lastName}`;
        req.session.email = client.email;
        req.session.phoneNumber = client.phone;
        res.render('pages/index', {title: 'Jagoron Academy'});
    }else{
        res.render('pages/auth/login', {title:'tyr again to log in', err: errMsg, val:{emailPhone, password}})
    }
}