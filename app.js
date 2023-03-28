import express from 'express';
import session from 'express-session'
import MongoStore from 'connect-mongo'
import expHandlebars from 'express-handlebars';
import prodRouter from './src/routes/products.router.js';
import cartRouter from './src/routes/carts.router.js';
import loginRouter from './src/routes/login.router.js';
import passport from 'passport'
import sessionGithubRouter  from './src/routes/session.router.js'
import inicializePassport from './src/config/passport.config.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const mongoStore = MongoStore.create({
    mongoUrl: process.env.CONNECTION_DB,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    ttl: 100
})
app.use(session({
    store: mongoStore,
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false
}));

inicializePassport();

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('.hbs', expHandlebars({extname: '.hbs', defaultLayout: 'main.hbs'}));
app.set('view engine', '.hbs');

app.use('/loginGithub', sessionGithubRouter);
app.use('/', loginRouter);
app.use('/api/products', prodRouter);
app.use('/api/carts', cartRouter);


const PORT = process.env.PORT
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${server.address().port}`);
});
server.on('error', error => console.log(error));
