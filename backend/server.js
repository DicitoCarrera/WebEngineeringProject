const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./database');
const userDb = require('./database/userDatabase');
const authRoutes = require('./routes/authRoutes');
const app = express();
const port = 3000;

// Установите Pug как шаблонизатор
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../frontend/views'));

// Убедитесь, что маршрут для главной страницы идет перед статическими файлами
app.get('/', (req, res) => {
  res.render('index');
});


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

app.get('/lessons', (req, res) => {
  db.all("SELECT * FROM lessons", [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.json(rows);
  });
});

app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});