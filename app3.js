var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var crypto = require('crypto');

app.use(cors());

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

var urlDB = "mongodb://localhost:27017/mydb";
let expDate = 1; //expiration date of token in minute

MongoClient.connect(urlDB, function(err, db) {// useless: create database if not exist
  if (err) throw err;
  console.log("Database exist!");
  db.close();
});



app.post('/login', function (req, res) {
let json =
  {
    "data": {
      "type": "account",
      "id": "val",
      "attributes": {
        "username": "Sam",
        "token":"val",
        "img":"https://life.ns12.it/wp-content/uploads/avatars/1/5da585a5729ed-bpfull.jpg"
    },"relationships": {
      "product": {
        "data": [
          { "type": "product", "id": "1" },
          { "type": "product", "id": "2" }
        ]
      }
    },
  },
    "included": [{
      "type": "product",
      "id": "1",
      "name": "prod1",
      "image": "null",
      "site": "null"
    }, {
      "type": "product",
      "id": "2",
      "name": "prod2",
      "image": "null",
      "site": "null"
    }]
}



  res.status(200).end(JSON.stringify(json));
  /*var attributes = req.body.data.attributes;
  console.log("JSON Username: " + attributes.username);
  console.log("JSON Password: " + attributes.password);
  MongoClient.connect(urlDB, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mongodb");
    dbo.collection("Users").findOne({username: attributes.username, password: attributes.password}, function(err, result) {
      if (err) throw err;
      if (result) {// exist this user, and password is correct
        var newToken;
        dbo.collection("Session").findOne({user: attributes.username}, function(err, tokResult) {
          if (err) throw err;
          if (tokResult) {// exist user with one token
            let timeToken = Math.abs(new Date() - tokResult.date)/(1000*60); // minuti di esistenza del token
            var newDate = new Date();// equal to now()
            if(timeToken < expDate){ // scadenza token: 1 minuto
              dbo.collection("Session").updateOne({user: attributes.username}, {$set: {date: newDate}}, function(err, res) {//refresh token
                if (err) throw err;
                db.close();
              });
              newToken = tokResult.token;
            }
            else{//expired: delete token and create
              dbo.collection("Session").deleteOne({user: attributes.username}, function(err, obj) {
                if (err) throw err;
                console.log("deleted Login: " + obj);
                db.close();
              });
              newToken = insertNewToken(db, dbo, attributes.username);//personal function
            }
          }else{// not exist this user with one token
            newToken = insertNewToken(db, dbo, attributes.username);//personal function
          }
        });

        console.log("Authenticated");

        var json = '';
        dbo.collection('Users').aggregate([ //query for user product  ---  Now useless
          { $match : { username : attributes.username } },
          { $lookup:
            {
              from: 'Products',
              localField: 'product_id',
              foreignField: '_id',
              as: 'user_product'
            }
          }
        ]).toArray(function(err, ris) {
          if (err) throw err;
          json = genJsonProduct(ris, newToken);// personal function
          res.status(200).end(json);
        });
      }
      else{
        console.log("Not authenticated");
        res.status(401).
        header("Content-Type", "application/vnd.api+json").
        end( JSON.stringify({ errors: [ { title: "Errore fase login", source: { pointer: "/data/attributes" }, detail: "Credenziali errate." } ] } ));
      }
    });
  });*/
});



/*app.post('/register', function (req, res) {
  var attributes = req.body.data.attributes;
  console.log(attributes.username);
  console.log(attributes.password);
  MongoClient.connect(urlDB, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mongodb");
    dbo.collection("Users").findOne({username: attributes.username}, function(err, result) {
      if (err) throw err;
      if (result) { //exist
        console.log("User already exist.");
        res.status(409).
        header("Content-Type", "application/vnd.api+json").
        end(JSON.stringify({ errors: [ { title: "Errore fase registrazione", source: { pointer: "/data/attributes" }, detail: "Questo username è già utilizzato." } ] } ));
      }
      else{
        var newId = crypto.randomBytes(16).toString('base64');
        var myobj = { _id: newId, username: attributes.username, password: attributes.password };
        dbo.collection("Users").insertOne(myobj, function(err, res) {
          if (err) throw err;
          db.close();
          console.log("User registered: " + attributes.username);
        });
        res.status(204).end();
      }
    });
  });
});*/


app.post('/sliderImg', (req, res) => {
  let json = [
    { img:"https://life.ns12.it/wp-content/uploads/2020/02/slide_1.jpg", link:"link1" },
    { img:"https://life.ns12.it/wp-content/uploads/2020/02/slide_2.jpg", link:"link2" },
    { img:"https://life.ns12.it/wp-content/uploads/2020/02/slide_3.jpg", link:"link3" }
  ]
  
  res.status(200).end(JSON.stringify(json));
});

app.post('/retrieveResource', function (req, res) {
let img = "data:image/png;base64,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"
let json =
  {
    "data": {
      "type": "account",
      "id": "val",
      "attributes": {
        "username": "sam",
        "token":"val"

    },"relationships": {
      "product": {
        "data": [
          { "type": "product", "id": "1" },
          { "type": "product", "id": "2" }
        ]
      }
    },
  },
    "included": [{
      "type": "product",
      "id": "1",
      "name": "prod1",
      "image": img,
      "site": "null"
    }, {
      "type": "product",
      "id": "2",
      "name": "prod2",
      "image": img,
      "site": "null"
    }]
}
  res.status(200).end(JSON.stringify(json));
  /*let user = req.body.data.attributes.username;
  let userToken = req.body.data.attributes.token;
  MongoClient.connect(urlDB, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mongodb");
    dbo.collection("Session").findOne({user: user, token: userToken}, function(err, result) {
      if (err) throw err;
      if (result) {// exist user with this token
        let timeToken = Math.abs(new Date() - result.date)/(1000*60);
        if(timeToken < expDate){ //scadenza token: 1 minuto
          var newDate = new Date();
          dbo.collection("Session").updateOne({user: user}, {$set: {date: newDate}}, function(err, res) {//refresh token
            if (err) throw err;
            db.close();
          });
          let resource = req.query.resource;
          if(resource === 'product'){
            var json = '';
            dbo.collection('Users').aggregate([ //query for user product
              { $match : { username : user } }, //correct: result.user ?
              { $lookup:
                {
                  from: 'Products',
                  localField: 'product_id',
                  foreignField: '_id',
                  as: 'user_product'
                }
              }
            ]).toArray(function(err, resJoin) {
              if (err) throw err;
              json = genJsonProduct(resJoin, userToken);
              res.status(200).end(json);
              console.log("Product sent to: " + user);
            });
          }else{
            console.log(resource);
          }
        }else{// token expired
          dbo.collection("Session").deleteOne({user: user}, function(err, obj) {
            if (err) throw err;
            db.close();
          });
          res.status(408).end( JSON.stringify({ errors: [ { title: "Errore sessione.", source: { pointer: "/data/attributes" }, detail: "Errore sessione scaduta." } ] } ));
        }
      }else{//se il token non esiste
        console.log("Not authenticated(auth)");
        res.status(408).end( JSON.stringify({ errors: [ { title: "Errore sessione.", source: { pointer: "/data/attributes" }, detail: "Errore sessione scaduta." } ] } ));
      }
    });
  });*/

  /*let user = req.body.data.attributes.username;
  let userToken = req.body.data.attributes.token;
  if( !authenticateUser(user, userToken) ){
    res.status(408).end();
    console.log(authenticateUser(user, userToken));
    return;
  }
  MongoClient.connect(urlDB, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mongodb");
    let resource = req.query.resource;
    if(resource === 'product'){
      var json = '';
      dbo.collection('Users').aggregate([ //query for user product
        { $match : { username : user } }, //correct: result.user ?
        { $lookup:
          {
            from: 'Products',
            localField: 'product_id',
            foreignField: '_id',
            as: 'user_product'
          }
        }
      ]).toArray(function(err, resJoin) {
        if (err) throw err;
        json = genJsonProduct(resJoin, userToken);
        res.status(200).end(json);
        console.log("Product sent to: " + user);
      });
    }else{
      console.log(resource);
    }
  });*/
});

// the user is not necessary
/*app.post('/validateSession', function (req, res) {// if the session is valid return a user with the associated product
  var username = req.body.data.attributes.username;
  var userToken = req.body.data.attributes.token;
  MongoClient.connect(urlDB, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mongodb");
    dbo.collection("Session").findOne({user: username, token: userToken}, function(err, result) {
      if (err) throw err;
      if (result) {// exist user with this token
        //nota: token lato client non refreshato: giusto così.
        let timeToken = Math.abs(new Date() - result.date)/(1000*60);
          if(timeToken < expDate){ //scadenza token: 1 minuto
            var newDate = new Date();
            dbo.collection("Session").updateOne({user: username}, {$set: {date: newDate}}, function(err, res) {//refresh token
              if (err) throw err;
              db.close();
            });

          }else{
            dbo.collection("Session").deleteOne({user: username}, function(err, obj) {
              if (err) throw err;
              db.close();
            });
          }
          if(timeToken < expDate){//se non è scaduto
            var json = '';
            dbo.collection('Users').aggregate([ //query for user product
              { $match : { username : result.user } }, //correct: result.user ?
              { $lookup:
                {
                  from: 'Products',
                  localField: 'product_id',
                  foreignField: '_id',
                  as: 'user_product'
                }
              }
            ]).toArray(function(err, ris) {
              if (err) throw err;
              json = genJsonProduct(ris, userToken);
              res.status(200).end(json);
              console.log("validateSession: " + username + "; " + userToken);
            });
          }else{//se il token è scaduto. (ricontrollare flusso if)
            console.log("Not authenticated(1)");
            res.status(408).end( JSON.stringify({ errors: [ { title: "Errore sessione.", source: { pointer: "/data/attributes" }, detail: "Errore sessione scaduta." } ] } ));
          }

      }else{//se il token non esiste
        console.log("Not authenticated(2)");
        res.status(408).end( JSON.stringify({ errors: [ { title: "Errore sessione.", source: { pointer: "/data/attributes" }, detail: "Errore sessione scaduta." } ] } ));
      }
    });
  });
});*/



app.listen(3000, function () {
  console.log('Server app listening on port 3000!');
});



function insertNewToken(db, dbo, username){// generate a token and insert new row in db
  var token = crypto.randomBytes(16).toString('base64');
  var newToken = crypto.createHash('md5').update(token).digest('hex');
  var obj = {user: username, token: newToken, date: new Date()};
  dbo.collection("Session").insertOne(obj, function(err, res) {
    if (err) throw err;
    console.log(username + ": " + newToken + " (new token) ");
    db.close();
  });
  return newToken;
}

/*function authenticateUser(username, token){ // control if token is valid, return true if is valid
  MongoClient.connect(urlDB, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mongodb");
    dbo.collection("Session").findOne({user: username, token: token}, function(err, result) {
      if (err) throw err;
      if (result) {// exist user with this token
        let timeToken = Math.abs(new Date() - result.date)/(1000*60);
        if(timeToken < expDate){ //scadenza token: 1 minuto
          var newDate = new Date();
          dbo.collection("Session").updateOne({user: username}, {$set: {date: newDate}}, function(err, res) {//refresh token
            if (err) throw err;
            db.close();
          });
          return true;
        }else{// token expired
          dbo.collection("Session").deleteOne({user: username}, function(err, obj) {
            if (err) throw err;
            db.close();
          });
          return false;
        }
      }else{//se il token non esiste
        console.log("Not authenticated(auth)");
        return false;
      }
    });
  });
}*/


function genJsonProduct(ris, token){//generate a json: with user and product of this user
  var json = "";
  json += '{';
  json += '  "data": {';
  json += '    "type": "account",'
  json += '    "id": "' + ris[0]._id + '",';// all position => same user
  json += '    "attributes": {';
  json += '      "username": "'+ ris[0].username + '",';
  json += '      "token": "'+ token + '"';
  json += '    },';
  json += '    "relationships": {';
  json += '      "product": {';
  json += '        "data": [';
  for(var i = 0; i < ris[0].user_product.length; i++){
    json += '        { "type": "product", "id": "' + ris[0].product_id[i] + '"}';
    if(i < ris[0].user_product.length-1){// se non è l'ultimo
      json += ',';
    }
  }
  json += '        ]';
  json += '      }';
  json += '    }';
  json += '  },';
  json += '  "included": [';
  for(var i = 0; i < ris[0].user_product.length; i++){
    json += '    {';
    json += '      "type": "product",'
    json += '      "id": "' + ris[0].product_id[i] + '",';
    json += '      "name": "' + ris[0].user_product[i].name + '",';// only 0 because 1 row for product...
    json += '      "site": "' +  ris[0].user_product[i].site + '",';// same name fix
    json += '      "image": "' +  ris[0].user_product[i].image + '"';
    json += '    }';
    if(i < ris[0].user_product.length-1){// se non è l'ultimo
      json += ',';
    }
  }
  json += '  ]';
  json += '}';
  return json;
}
