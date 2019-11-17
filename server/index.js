var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const db = require('../database/index');
const port = process.env.PORT || 3000;

var app = express();

app.use(express.static(path.join(`${__dirname}/../public`)));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/items', function (req, res) {
  db.selectAll(function(err, data) {
    if(err) {
      console.log("more errors")
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});


