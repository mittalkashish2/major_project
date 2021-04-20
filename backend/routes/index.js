
var express = require('express');
var fs = require('fs');
var router = express.Router();


fs.readFile("credentials.json", function(err, data) {
      
  // Check for errors
  if (err) throw err;
 
  // Converting to JSON
  var users = JSON.parse(data);
    
  //console.log(users); // Print users 
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Welcome to backend server");
});

router.post('/login',function(req,res){

  console.log("Kashish Mittal");
  
  let result = users.find(user => user.username == req.body.username);
  if(result){
    if(result.password == req.body.password){
      res.status(200).send({
        message:"Sucessful login!!"
      });

    }else{
      res.status(200).send({
        message: "Incorrect Credentials!!"
      });
    }
  }else{
    res.status(200).send({
      message: "User Not Found!!"
    });

  }


});

module.exports = router;

