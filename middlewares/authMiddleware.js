const studentModel = require('../models/Student')

exports.bindUserWithRequest = () => {
    return async (req, res, next) => {
        if(!req.session.isLoggedIn){
            return next()
        }
        try{
            let user = await  studentModel.findById(req.session.user._id)
            req.user = user
            next()
        } catch(e) {
            console.log(e)
            next(e)
        }
    }
}

exports.isAuthenticated = (req,res,next) => {
    if(!req.session.isLoggedIn){
        return res.redirect('/auth/login')
    }
    next();
}
