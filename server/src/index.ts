import { MainClass } from './main-class';
import express, {Request, Response} from 'express';
import { configureRoutes} from './routes/routes';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import passport from 'passport';
import { configurePassport } from './passport/passport';
import mongoose from 'mongoose';
import cors from 'cors';


const app = express();
const port = 5000;
const dbUrl = 'mongodb://localhost:6000/my_db';

// mongodb connection
mongoose.connect(dbUrl).then(() =>{
    console.log('Successfully conncted to MongoDB');
}).catch(error => {
    console.log(error);
    return;
});

const whitelist = ['*', 'http://localhost:4200']
const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allowed?: boolean) =>void) => {
        if (whitelist.indexOf(origin!) !== -1 || whitelist.includes('*')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS.'));
        }
    }
}

app.use(cors(corsOptions));

//bodyParser
app.use(bodyParser.urlencoded({extended: true}));

//cookieParser
app.use(cookieParser());

//session
const sessionOptions: expressSession.SessionOptions = {
    secret: 'testsecret',
    resave: false,
    saveUninitialized: false
};
app.use(expressSession(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

configurePassport(passport);

app.use('/app', configureRoutes(passport, express.Router()));
/*
app.get('/', (req: Request, res: Response) => { //fat-arrow
    let myClass = new MainClass();
    res.status(200).send('Hello, World!');
});

app.get('/callback', (req: Request, res: Response) => { //fat-arrow
    let myClass = new MainClass();
    myClass.monitoringCallback((error, result) => {
        if (error) {
            res.write(error);
            res.status(400).end();
        } else {
            res.write(result);
            res.status(200).end();
        }
    });
})
*/
app.listen(port, () => {
    console.log('Server is listening on port ' + port.toString());
} );