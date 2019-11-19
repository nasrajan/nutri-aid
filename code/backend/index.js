var express = require('express')
var app = express();
var cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors({ origin: '*', credentials: true }));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.post('/signup',function (req, res){
  console.log('signup post request');
  console.log(req.body);
  const data = {
    'authenticated' : 'true'
  }
  res.end(JSON.stringify(data));
});


app.get('/data',function (req, res){
  console.log(req.body);
  console.log('data get request');
  const data = {
    'random' : 'randomData'
  }
   res.end(JSON.stringify(data));
 });
app.listen(3001);