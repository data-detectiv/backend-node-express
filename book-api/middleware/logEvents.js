const { v4: uuid } = require('uuid');
const { format } = require('date-fns');
const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');


const logEvent = async (message, logName) => {
    const dateTime = format(new Date(), 'yyyMMdd\tHH:mm:ss');
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromise.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await fsPromise.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);

    } catch (err) {
        console.error(err);
    }
};

const logger = (req, res, next) => {
    logEvent(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    next();
}

module.exports = { logger, logEvent };
