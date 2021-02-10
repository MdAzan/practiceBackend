// 1 inherit modules from node_modules
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const session = require('express-session');

// 1.1 inherit object from node modules
const app = express();







// inherit local modules
const authRoute = require('./routers/authRoute');
const {bindUserWithRequest, isAuthenticated} = require('./middlewares/authMiddleware')
const setLocals = require('./middlewares/setLocals')







/* 2 setup application environment */
app.set('view engine', 'ejs');








// setup session with the help of mongodb-session and mongodb-connect-session
const mongoDbStore = require('connect-mongodb-session')(session);
const myUri = `mongodb+srv://helloazan:justpractice@cluster0.j6mwb.mongodb.net/Students?retryWrites=true&w=majority`;
var store = new mongoDbStore({ uri: myUri, collection: 'currentUser' });
 
// Catch errors
store.on('error', function(error) {
    console.log(error);
});

function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();
    newDate.setHours(hours - offset);
    return newDate;   
}
var date = convertUTCDateToLocalDate(new Date());

// middlewares
const middleware = [
    morgan('dev'),
    express.urlencoded({ extended: true }),
    express.static('public'),
    express.json(),
    session({
      secret: process.env.SECRET_KEY || "SECRET_KEY",
      resave: false,
      saveUninitialized: false,
      store: store,
      cookie: {
               maxAge: 1000 * 60 * 2
               //expires: parseFloat(date) + 60 * 1000 * 2
              }
    }),
    bindUserWithRequest(),
    setLocals()
];

app.use(middleware);





// controll all routes
app.use('/auth', authRoute);

app.get('/study/physics', isAuthenticated ,(req, res) => {
    console.log(req.session.isLoggedIn)
    return res.redirect('/auth/signup')
})

app.get('/study/exam', isAuthenticated ,(req, res) => {
    return res.redirect('/auth/signup')
})

app.get('/contact', isAuthenticated ,(req, res) => {
    return res.redirect('/auth/signup')
})

app.get('/', isAuthenticated ,(req, res) => {
    console.log("hello index")
    console.log(req.session)
    res.render('pages/index', {title: 'Jagorn Academy'});
})






// create server and listen
const PORT = process.env.PORT || 1010;
mongoose.connect(myUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Database is connected')
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch((e) => {
        return console.log(e)
    })





// const studentModel = require('./models/Student')
// async function user(){
//     //const mydata = await studentModel.findOne({email: 'ahobbanazan@gmail.com'})
    
// }user()



