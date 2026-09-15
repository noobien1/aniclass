require('dotenv').config();
const webRoutes = require('./routes/web');

const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) =>{
    res.locals.appName = process.env.APP_NAME || 'My App';
    next();
});

app.use('/', webRoutes);

app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).send('Terjadi kesalahan pada server.');
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});