import express from 'express';
import cors from 'cors';
import {getResults, Append} from './database.js';

const app = express();
app.use(cors());
app.use(express.json());

app.listen(8080, () => {
    console.log('App is running on Port 8080.');
});

app.get('/results', async(req, res) => {
    const results = await getResults();
    res.json(results);
});

app.post('/results', async(req, res) => {
    const {memberName, response1, response2, response3, response4, response5} = req.body;
    const newResults = await Append(memberName, response1, response2, response3, response4, response5);
    res.status(201).json( {message: 'Data inserted successfully.', newResults })
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})