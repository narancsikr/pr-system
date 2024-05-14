"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes/routes");
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = require("./passport/passport");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 5000;
const dbUrl = 'mongodb://localhost:6000/my_db';
// mongodb connection
mongoose_1.default.connect(dbUrl).then(() => {
    console.log('Successfully conncted to MongoDB');
}).catch(error => {
    console.log(error);
    return;
});
const whitelist = ['*', 'http://localhost:4200'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || whitelist.includes('*')) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS.'));
        }
    }
};
app.use((0, cors_1.default)(corsOptions));
//bodyParser
app.use(body_parser_1.default.urlencoded({ extended: true }));
//cookieParser
app.use((0, cookie_parser_1.default)());
//session
const sessionOptions = {
    secret: 'testsecret',
    resave: false,
    saveUninitialized: false
};
app.use((0, express_session_1.default)(sessionOptions));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
(0, passport_2.configurePassport)(passport_1.default);
app.use('/app', (0, routes_1.configureRoutes)(passport_1.default, express_1.default.Router()));
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
});
