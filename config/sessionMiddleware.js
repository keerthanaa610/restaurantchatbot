const session = require("express-session");

const { config } = require("./config");


const maxAge = parseInt(config.sessionMaxAge)

const sessionMiddleware = session({
	secret:'tasty food',
	resave:false,
    Cookie:('maxAge:6000000'),
    saveUninitialized:false
});

module.exports = sessionMiddleware;
