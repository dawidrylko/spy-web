const express = require('express');
const sslRedirect = require('heroku-ssl-redirect');
const app = express();

app.use(sslRedirect());

app.use(express.static(__dirname));
app.listen(process.env.PORT || 8080);
