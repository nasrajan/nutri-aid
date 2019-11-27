var express = require('express')
var app = express();
var cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors({ origin: '*', credentials: true }));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var database = require('./database');

 



app.post('/signup',function (req, res){
  console.log(req.body);
  database.getConnection(function(error){
    if(error)
      {
        console.log(error);
        return;
      }
      var sql = "INSERT INTO LOGIN VALUES(0,'" +req.body.name+ "', '" + req.body.email + "', '"+ req.body.password +"', true)";
      console.log(sql);
      const data = {
        'authenticated' : ''
      }
    
      database.query(sql, function (error, response) {
      if (error) 
      {
          if(error.code == 'ER_DUP_ENTRY')
          {
              data.authenticated = 'emailError';
          }
      }
      else
      {
        data.authenticated = 'true';
      }
          
      res.end(JSON.stringify(data));
      });
    }
  )
  
});


app.post('/signin',function (req, res){
  console.log(req.body);
  database.getConnection(function(error){
    if(error)
      {
        console.log(error);
        return;
      }
      var sql = "SELECT EMAIL, PWD FROM LOGIN WHERE EMAIL = '" +req.body.email+ "' AND PWD = '" + req.body.password + "'";
      console.log(sql);
      database.query(sql, function (error, response) {
        if (error) 
          console.log(error);
          
      const data = {
        'authenticated' : false
      }

      if(response.length == 1)
        data.authenticated = true;
      res.end(JSON.stringify(data));
      });
    }
  )
  
});


app.get('/data',function (req, res){
  console.log(req.body);
  console.log('data get request');
  const data = {
    'random' : 'randomData'
  }
   res.end(JSON.stringify(data));
 });
//app.listen(3001);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
