const account = require('./account/lib.js');

module.exports = function (app) {
    app.post('/login',account.login);
    app.post('/signup',account.signup);
    app.post('/addFilm',account.createFilm);
    app.get('/getFilms',account.getFilms);
}