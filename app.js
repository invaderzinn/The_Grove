if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const Event = require('./models/event');
const dbURL = process.env.DB_URL

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})



const app = express();


app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

const secret = process.env.secret

const sessionConfig = {
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}




app.use(session(sessionConfig));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    next();
})


app.get('/', (req, res) => {
    res.render('home')
});

// app.get('/makeevent', async(req, res) => {
//     const event = new Event({first: 'Lauren', last: 'Zinn'});
//     await event.save();
//     res.send(event)
// });

app.get('/grove/party', (req, res) => {
    res.render('grove/party')
})

app.post('/grove/random', async(req, res) => {   
    const event = new Event(req.body.event);
    await event.save();
    req.flash('success', 'Thank you! Someone will contact you soon!')
    res.redirect('/grove/party')
})



app.get('/grove/menu', (req, res) => {
    res.render('grove/menu')
})



app.get('/grove/contact', (req, res) => {
    res.render('grove/contact')
})

app.get('/grove/about', (req, res) => {
    res.render('grove/about')
})

app.get('/grove/random', (req, res) => {
    res.render('grove/random')
})


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`serving on port ${port}`)
});