const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

const indexPage = `
<h3>APIs</h3>
<ul>
    <li><a href="/dogs">/dogs</a></li>
</ul>
`;

app.get('/', (req, res) => res.send(indexPage));

app.get('/healthcheck', (req, res) => {
    try {
        res.status(204);
    } catch (error) {
        res.status(500);
    }
});

app.get('/dogs', async (req, res) => {
    try {
        const response = await axios.get('https://dog.ceo/api/breeds/image/random');
        // {"message":"https:\/\/images.dog.ceo\/breeds\/vizsla\/n02100583_5829.jpg","status":"success"}

        console.log(JSON.stringify(response.data));
        const { message: dogImage } = response.data;
        res.send(`<img src="${dogImage}" />`);
    
    } catch (error) {
        res.status(500);
    }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));