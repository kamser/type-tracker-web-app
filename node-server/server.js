import cors from 'cors';
import express from 'express';
import readJSON from './utils.js';
import { corsMiddleware } from './middleware/corsMiddleware.js';

const app = express();
app.disable('x-powered-by');

const PORT = process.env.PORT ?? 3000;

/*app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});*/
app.use(cors());
//app.use(corsMiddleware());


app.get('/', (req, res) => {
    const testData = readJSON('./data.json');
    console.log(testData);
    //res.append('Access-Control-Allow-Origin', ['*']);
    //res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    //res.append('Access-Control-Allow-Headers', 'Content-Type');
    //res.header('Content-Type', 'application/json');
    //res.header('Access-Control-Allow-Origin', '*');
    res.status(201).json(JSON.stringify(testData))
});

app.listen(PORT, () => {
    console.log(`server http://localhost:${PORT} is up an running...`);
})