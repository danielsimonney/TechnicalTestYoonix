const expressJwt=require("express-jwt");
let config= require('./config')
module.exports = (app) => {
    app.use(expressJwt({ secret: config.secret }).unless((req) => {
        return (
            req.originalUrl === '/user/login' && req.method === 'POST' ||
            req.originalUrl === '/user/signup' && req.method === 'POST' 
        )
    }))
}
