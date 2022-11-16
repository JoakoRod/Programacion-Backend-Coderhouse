const express = require('express');
const http = require('http');
const { initWsServer } = require('./socket');
const handlebars = require('express-handlebars');
const path = require('path');
const mainRouter = require('../routes/api/index');
const routerPages = require('../routes/pages/index');

const app = express();
const server = http.Server(app);

const viewsFolderPath = path.resolve(__dirname, '../../views');
const layoutDirPath = path.resolve(__dirname, '../../views/layouts');
const defaultLayerPath = path.resolve(__dirname, '../../views/layouts/index.hbs');
const partialDirPath = path.resolve(__dirname, '../../views/partials');

app.set('view engine', 'hbs');
app.set('views', viewsFolderPath);

app.engine('hbs', handlebars.engine({
    extname: ".hbs",
    defaultLayout: defaultLayerPath,
    layoutsDir: layoutDirPath,
    partialsDir: partialDirPath
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', mainRouter);
app.use('/', routerPages)

initWsServer(server); //Conexion con el socket

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'internal server err';

    res.status(status).json({
        message,
        stack: err.stack
    })
});

module.exports = server;