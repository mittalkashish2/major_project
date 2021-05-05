const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
var cors = require('cors');
const {spawn} = require('child_process');


const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(8000, function(){
  console.log('listening to 8000');
});

app.get('/test',function(req,res) {
  console.log('test');
  res.send('Hello test');
});

app.post('/login',function(req,res){

    console.log(req.body);
  
    fs.readFile("credentials.json", function(err, data) {
        
      // Check for errors
      if (err) throw err;
     
      // Converting to JSON
      var users = JSON.parse(data);
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
  });

app.post('/register',function(req,res){

    // console.log(req.body);
  
    let data = fs.readFileSync("credentials.json");
    var users = JSON.parse(data);
    console.log(users);
    let result = users.find(user => user.username === req.body.username);
    console.log(result);
    if(result){
      console.log('1');
      res.send('Already Registered');
    }
    //   else{
    //   console.log('2');
    //   let length = users.length;
    //   users[length] = req.body;
    //   console.log(users);
    //   let writeData = JSON.stringify(users, null, 2);
    //   fs.writeFileSync('credentials.json', writeData, finished);

    //   function finished(err) {
    //       if(err)
    //       res.send(err);
    //       else
    //       res.send('Successfully Registered');
    //   }  
    // }
    res.send('OK');
  });

  app.post('/interest/:user',function(req, res) {
    var email="user@gmail.com";
    var temp = 6;
    var dataToSend = 10;
    var largeDataSet = [];
    var interests_list = req.body.selectedInterests;
    const python = spawn('python', ['../MAJOR/at the time of recommendation.py',email,interests_list]);
    // const python = spawn('python', ['py script.py',temp]);
    python.stdout.on('data', function (data) {
      console.log('Pipe data from python script ...');
      var data1 = data.toString();
      console.log(data.toString());
      data1=data1.split(',');
      console.log(data1[0]);
      largeDataSet.push(data.toString());
      // dataToSend = data.toString();       #
      // dataToSend = data + 1;
   });

   python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
      console.log("Hello");
      console.log(largeDataSet);
       // res.send(dataToSend);  
       console.log("Hello1");
       res.send(largeDataSet.join(""));
    });

    // console.log(req.params.user);
    // console.log(req.body.selectedInterests);
    // res.send('Ok');
  })
  