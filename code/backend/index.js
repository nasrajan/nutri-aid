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


app.post('/search',function (req, res){
  console.log(req.body);
  database.getConnection(function(error){
    if(error)
      {
        console.log(error);
        return;
      }
      var sql = "SELECT * FROM FOODS WHERE `FOOD NAME` LIKE '%"+ req.body.search+ "%'";
      console.log(sql)
      database.query(sql, function (error, response) {
        if (error) 
          console.log(error);
        console.log(response);
      res.end(JSON.stringify(response));
      });
    }
  )
  
});

app.post('/getpreferences',function (req, res){
  console.log(req.body);
  database.getConnection(function(error){
        if(error)
        {
          console.log(error);
          return;
        }
        var sql = "SELECT login.email, users_diet_preferences.id, nutrition_name, nutrition_value FROM login, users_diet_preferences\n" +
            "\tWHERE login.id=users_diet_preferences.users_id AND login.email='" + req.body.email + "'";
       // var sql = "SELECT * FROM FOODS WHERE `FOOD NAME` LIKE '%"+ req.body.search+ "%'";
        console.log(sql);
        database.query(sql, function (error, response) {
          if (error)
            console.log(error);
          console.log(JSON.stringify(response));
          res.end(JSON.stringify(response));
        });
      }
  )

});
app.post('/savepreferences',function (req, res){
  console.log('save preferences');
  console.log(req.body);
  
  database.getConnection(function(error){
        if(error)
        {
          console.log(error);
          return;
        }
        var id = null;
        var sql =  "SELECT ID FROM LOGIN WHERE EMAIL = '" + req.body.user + "'";
        console.log(sql);
        database.query(sql, function (error, response) {
          if (error)
            console.log(error);    
        id = response[0].ID;
        
        //Water
        var sql = "INSERT INTO users_diet_preferences VALUES(0," + id + ", 'water',"+req.body.water+")";
        console.log(sql);
        database.query(sql, function (error, response) {
          //Protein
          sql = "INSERT INTO users_diet_preferences VALUES(0," + id + ", 'protein',"+req.body.protein+")";
          database.query(sql, function (error, response) {
            //Fat
            sql = "INSERT INTO users_diet_preferences VALUES(0," + id + ", 'fat',"+req.body.fat+")";
            database.query(sql, function (error, response) {
              //Carbohydrates
              sql = "INSERT INTO users_diet_preferences VALUES(0," + id + ", 'carbohydrate',"+req.body.water+")";
              database.query(sql, function (error, response) {
                //Energy
                sql = "INSERT INTO users_diet_preferences VALUES(0," + id + ", 'energy',"+req.body.calories+")";
                database.query(sql, function (error, response) {
                  //Starch
                  sql = "INSERT INTO users_diet_preferences VALUES(0," + id + ", 'starch',"+req.body.starch+")";
                  database.query(sql, function (error, response) {
                    //Sugars
                    sql = "INSERT INTO users_diet_preferences VALUES(0," + id + ", 'totalsugars',"+req.body.sugar+")";
                    database.query(sql, function (error, response) {
                      //Glucose
                      sql = "INSERT INTO users_diet_preferences VALUES(0," + id + ", 'glucose',"+req.body.glucose+")";
                      database.query(sql, function (error, response) {
                        //Cholestrol
                        sql = "INSERT INTO users_diet_preferences VALUES(0," + id + ", 'cholestrol',"+req.body.cholestrol+")";
                        database.query(sql, function (error, response) {
                          //Calcium
                          sql = "INSERT INTO users_diet_preferences VALUES(0," + id+ ", 'calcium',"+req.body.calcium+")";
                          database.query(sql, function (error, response) {
                            //Iron
                            sql = "INSERT INTO users_diet_preferences VALUES(0," +id + ", 'iron',"+req.body.iron+")";
                            database.query(sql, function (error, response) {
                              if (error)
                                console.log(error);    
                                
                                res.end();
                            });          
                          });       
                        });         
                      });        
                    });          
                  });       
                });          
              });         
            });        
          });        
        });
      });
     
      }
  )


});


app.post('/favorite',function (req, res){
  console.log(req.body);
  database.getConnection(function(error){
    if(error)
      {
        console.log(error);
        return;
      }
      var sql = "INSERT INTO FAVORITES VALUES ('" + req.body.user +"','" + req.body.food +"')";
      console.log(sql)
      database.query(sql, function (error, response) {
        if (error) 
          console.log(error);
        res.end();
      });
    }
  )
  
});

app.post('/favorite-foods',function (req, res){
  console.log(req.body);
  database.getConnection(function(error){
    if(error)
      {
        console.log(error);
        return;
      }
      var sql = "SELECT * FROM FOODS WHERE `FOOD NAME` IN (SELECT FOOD FROM FAVORITES WHERE EMAIL = '" + req.body.email + "')";
      console.log(sql)
      database.query(sql, function (error, response) {
        if (error) 
          console.log(error);
        res.end(JSON.stringify(response));
      });
    }
  )
  
});


app.post('/remove-favorite',function (req, res){
  console.log(req.body);
  database.getConnection(function(error){
    if(error)
      {
        console.log(error);
        return;
      }
      var sql = "DELETE FROM FAVORITES WHERE FOOD = '" + req.body.food + "' AND EMAIL = '" + req.body.user + "'";
      console.log(sql);
      database.query(sql, function (error, response) {
        if (error) 
          console.log(error);
        res.end();
      });
    }
  )
  
});

//app.listen(3001);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
