const express = require("express");
const app = express();
// const newsRoutes = require("./routes/news");
const usersRoutes = require("./routes/users");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const pino = require('pino');
const cors = require("cors");
const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    }
});
const pinoHttp = require('pino-http');

const loggerMiddleware = pinoHttp({
    logger
});


app.use(loggerMiddleware);
app.use(cors());
app.use(bodyParser.json());
// app.use("/api/news", newsRoutes);
app.use("/api/users", usersRoutes);


app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "something went wrong";
    res.status(statusCode).json({
        message
    });
});

const mongoURL = "mongodb://database:27017/users"

mongoose.connect(mongoURL).then(
    app.listen(3000)

).catch(err => console.log(err));