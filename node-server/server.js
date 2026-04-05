import cors from 'cors';
import express from 'express';
//import cookieParser from 'cookie-parser';
//import jwt from 'jsonwebtoken';

//import readJSON, {checkJWTTokensExistenceForServer} from './utils.js';
//import { corsMiddleware } from './middleware/corsMiddleware.js';
import { createUserRouter } from './routes/user.js';
import { UserModel } from './model/mysql/user.js';
import { createAssesmentRouter } from './routes/assesment.js';
import { AssesmentModel } from './model/mysql/assesment.js';
//import { SECRET_PHRASE } from './config/serverConfig.js';

const app = express();

app.disable('x-powered-by');

const PORT = process.env.PORT ?? 3000;

/*app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});*/
const corsOption = {
    origin: ['http://localhost:3000'
            , 'https://10.5.0.2:8000'
            , 'https://192.168.1.92:8000'
            , 'https://127.0.0.1:8000'],
    credentials: true
};
app.use(cors(corsOption));
app.use(express.json());
//app.use(corsMiddleware());
//app.use(cookieParser());
/*app.use((req, res, next) => {
    console.log('This is the req: ', req.cookies.access_token);
    const token = req.cookies.access_token;
    req.session = {user: null};

    try {
        const data = jwt.verify(token, SECRET_PHRASE);
        req.session.user = data;
    } catch (error) {
        
    }
    next();
});*/


//checkJWTTokensExistenceForServer();


app.use('/auth/user', createUserRouter({userModel: UserModel}));

//app.use('/auth/assesment', createAssesmentRouter({assesmentModel: AssesmentModel}));
app.use('/assesment', createAssesmentRouter({assesmentModel: AssesmentModel}));


/*app.get('/assesment', (req, res) => {
    const testData = readJSON('./data.json');
    console.log(testData);
    res.status(201).json(JSON.stringify(testData))
});*/

app.listen(PORT, () => {
    console.log(`server http://localhost:${PORT} is up an running...`);
})