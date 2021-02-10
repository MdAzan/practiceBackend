const router = require('express').Router();


const {
        signupGetController,
        signupPostController,
        loginGetController,
        loginPostController
} = require('../controllers/authController');

const signupValidation = require('../validators/signupValidator');
const loginValidation = require('../validators/loginValidator');




router.get('/signup', signupGetController);

router.post('/signup',signupValidation, signupPostController);

router.get('/login', loginGetController);

router.post('/login',loginValidation, loginPostController)




module.exports = router;