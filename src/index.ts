import axios, { AxiosResponse } from 'axios';
// @ts-ignore
import express from 'express';

const app = express();
const port = 3000;

app.get('/', (_, res) => {
    res.send('Hello World!');
});

app.get('/todos', async (_, res) => {
    try {
        const results: AxiosResponse = await axios.get(
            'https://jsonplaceholder.typicode.com/todos',
        );
        res.json(results.data);
    } catch (err) {
        res.send(err);
        res.sendStatus(500);
    }
});

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Starting port on: ${port}`);
});
