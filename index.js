const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = 5000;

const config = require('./config/configs');
const spans = require('./routes/spans')

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log("Мы успешно подключились к бд");
});

mongoose.connection.on('error', (err) => {
    console.log("Мы не подключились к бд: " + err);
});

app.use('/spans',spans);

app.listen(port, () => {
    console.log("Сервер был запущен по порту: " + port);
});
