const request = require('request');
const logger = require('./logger');
const fs = require('fs');

const triesPerSecond = 0.8;

var working = [];

const cl = {
    red: `\x1b[39m\x1b[31m`,
    green: `\x1b[39m\x1b[32m`,
    reset: `\x1b[39m`,
}

getGiftCode = function () {
    let code = '';
    let dict = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (var i = 0; i < 19; i++) {
        code = code + dict.charAt(Math.floor(Math.random() * dict.length));
    }
    return code;
}

checkCode = function (code) {
    request(`https://discord.com/api/v6/entitlements/gift-codes/${code}?with_application=false&with_subscription_plan=true`, (error, res, body) => {
        if (error) {
            logger.error(cl.red + 'ERROR: ' + error + cl.reset);
            return;
        }
        try {
            body = JSON.parse(body);
            if (body.message !== "You are being rate limited.") {
                logger.info(`${cl.green}WORKING CODE: https://discord.gift/${code}${cl.reset}`);
                console.log(JSON.stringify(body, null, 4));
                working.push(`https://discord.gift/${code}`);
                fs.writeFileSync(__dirname + '/codes.json', JSON.stringify(working, null, 4));
            }
            else {
                logger.info(`${code} • Status: ${cl.red}Not working${cl.reset}`);
            }
        } catch (error) {
            logger.error(cl.red + 'ERROR: ' + error + cl.reset);
            return;
        }
    });
}


checkCode(getGiftCode());
setInterval(() => {
    checkCode(getGiftCode());
}, (1 / triesPerSecond) * 100);
