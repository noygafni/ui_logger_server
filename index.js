const express = require('express')
const cors = require('cors');
const winston = require('winston');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.splat(),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.File({
            filename: 'client.log',
            maxsize: 10000000,
            maxFiles: 10
        })
    ]
});

app.post('/logger', (req, res) => {
    req.body.forEach((logInformation) => {
        const logTime = new Date(logInformation.time);
        logger.log({
            level: logInformation.level,
            message: `${logTime.toLocaleString()}:${logTime.getMilliseconds()}ms ====> ${logInformation.message}`
        });
    })
    res.sendStatus(200);
})

app.listen(port, () => console.log(`app listening with port:${port}`))