const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json())

app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(port, () => console.log(`Listening on port: ${port}`));