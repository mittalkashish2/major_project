const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
var cors = require('cors');
const {spawn} = require('child_process');
const nodemailer = require('nodemailer');

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
      let result = users.find(user => user.email == req.body.username);
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

app.post('/success',function(req,res){
    let data = fs.readFileSync("credentials.json");
    var users = JSON.parse(data);
    let length = users.length;
        users[length] = req.body;
        // console.log(users);
        let writeData = JSON.stringify(users, null, 2);
        fs.writeFileSync('credentials.json', writeData);
        res.send('Successfully Registered');
    
    // res.send('Successfully Registered');
  });

app.post('/register',function(req,res){

    // console.log(req.body);
  
    let data = fs.readFileSync("credentials.json");
    var users = JSON.parse(data);
    // console.log(users);
    let result = users.find(user => user.email === req.body.email);
    // console.log(result);
    if(result){
      // if(result.password == req.body.password && result.email == req.body.email){
        res.send("Email already Registered");
      // }
      // else{
      //   res.send("Username: Exists");
      // }
    }
    else{
        let otp = Math.floor(100000 + Math.random() * 900000);
        let mailTransporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'courserecommendar@gmail.com',
              pass: 'akns202021'
          }
        });
        
        let mailDetails = {
          from: 'courserecommendar@gmail.com',
          to: req.body.email,
          subject: 'OTP for registration',
          text: 'Your OTP for registration is ' + otp
        };
        
        mailTransporter.sendMail(mailDetails, function(err, data) {
          if(err) {
              console.log('Error Occurs' + err);
          } else {
              console.log('Email sent successfully');
              res.send(JSON.stringify(otp));
          }
        });

        // let length = users.length;
        // users[length] = req.body;
        // // console.log(users);
        // let writeData = JSON.stringify(users, null, 2);
        // fs.writeFileSync('credentials.json', writeData);

        // res.send('Registration Successful!!');

        // function finished(err) {
        //   if(err)
        //   res.send(err);
        //   else
        //   res.send('Successfully Registered!!');
        //}
        // const obj={
        //   "username": req.body.username,
        //   "email": req.body.email,
        //   "password": req.body.password
        // }
        // console.log(obj);
        // users.push(obj);
        // let writeData = JSON.stringify(users, null, 2);
        // fs.writeFileSync('credentials.json', writeData, finished);
        // res.send('Registration Successful!!');
    }
  });

  // app.post('/interest/:user',function(req, res) {
  //   var email="user@gmail.com";
  //   var temp = 6;
  //   var dataToSend = 10;
  //   var largeDataSet = [];
  //   var interests_list = req.body.selectedInterests;
  //   const python = spawn('python', ['../MAJOR/at the time of recommendation.py',email,interests_list]);
  //   // const python = spawn('python', ['py script.py',temp]);
  //   python.stdout.on('data', function (data) {
  //     console.log('Pipe data from python script ...');
  //     var data1 = data.toString();
  //     console.log(data.toString());
  //     data1=data1.split(',');
  //     console.log(data1[0]);
  //     largeDataSet.push(data.toString());
  //     // dataToSend = data.toString();       #
  //     // dataToSend = data + 1;
  //  });

  //  python.on('close', (code) => {
  //   console.log(`child process close all stdio with code ${code}`);
  //   // send data to browser
  //     console.log("Hello");
  //     console.log(largeDataSet);
  //      // res.send(dataToSend);  
  //      console.log("Hello1");
  //      res.send(largeDataSet.join(""));
  //   });

  //   // console.log(req.params.user);
  //   // console.log(req.body.selectedInterests);
  //   // res.send('Ok');
  // })

app.post('/interest',function(req, res) {
    let email= req.body.username;
    console.log(email);
    let interests_list = req.body.selectedInterest;
    let future_aspirations = req.body.selectedAspiration;
    
    let obj = {
      email,
      interests_list,
      future_aspirations
    }

    const python = spawn('python', ['../MAJOR/at the time of recommendation.py']);
    python.stdout.on('data', function(data){

      console.log("Hello");
      // var str = data.toString();
      // str = str.replace(/'/g, '"');
      // var list = JSON.parse(str);
      // console.log(list);
      // console.log(data.toString());
      let result = JSON.parse(data.toString());
      console.log(result);
      console.log(result['course_id']);
      console.log(result['course_name']);
      let sendData = {courseId: result['course_id'],
                      courseName: result['course_name']};
      res.send(sendData);
      // console.log(result['interests_list']);
    });


    python.stdout.on('end', function(){
     console.log("Recaeched here");
    });
    //python.stdin.write(JSON.stringify(JSON.stringify(interests_list)))
    python.stdin.write(JSON.stringify(obj))
    python.stdin.end()

  });
  
  app.post('/submitCourses',function(req,res){
    let email= req.body.username;
    let selectedCourses = req.body.selectedCourses;
    console.log(selectedCourses);
    let obj={
      email,
      courses_list: selectedCourses
    };

    const python = spawn('python', ['../MAJOR/get selected courses checkbox.py']);
    python.stdout.on('data', function(data){

      console.log("Hello");
      // var str = data.toString();
      // str = str.replace(/'/g, '"');
      // var list = JSON.parse(str);
      // console.log(list);
      // console.log(data.toString());
      // let result = JSON.parse(data.toString());
      // console.log(result);
      // console.log(result['course_id']);
      // console.log(result['course_name']);
      // let sendData = {courseId: result['course_id'],
      //                 courseName: result['course_name']};
      // res.send(sendData);
      // console.log(result['interests_list']);
      res.send("Saved Successfully");
    });


    python.stdout.on('end', function(){
     console.log("Recaeched here");
    });
    //python.stdin.write(JSON.stringify(JSON.stringify(interests_list)))
    python.stdin.write(JSON.stringify(obj))
    python.stdin.end()

    res.send('Submitted Successfully');
  })
  
  app.post('/carray',function(req,res){

    var course_array = [];
    var cid_array = [];
    var cname_array = [];

    //var email = req.body.email;
    var email = "bashka@gmail.com";
    var obj = {
      email
    }
    console.log(obj);

    const python = spawn('python', ['../MAJOR/display_recommended_courses_for_rating.py']);
    
    python.stdout.on('data', function(data){

      console.log("Hello");
      
      var result = JSON.parse(data.toString())
      console.log(result['cid_array']);
      cid_array = result['cid_array'];

      console.log(result['cname_array']);
      cname_array = result['cname_array'];
      
      for(var i=0;i<cid_array.length;i++){
         course_array.push({ "cid":cid_array[i], "cname":cname_array[i] });
      }
      
    });

    python.stdout.on('end', function(){
      console.log("Reached here");
      res.status(200).send({arr: course_array});
     });
     //python.stdin.write(JSON.stringify(JSON.stringify(interests_list)))
     python.stdin.write(JSON.stringify(obj))
     python.stdin.end()
 });

 app.post('/feedback',function(req,res){
  if(req.body.feedback[0] !== "$")
  {
    console.log(req.body.email);
    console.log("No. of courses: " + req.body.feedback.length);
    console.log(req.body.feedback);
    res.send('Thanks for giving feedback!!');
  }
  else{
    console.log(req.body.email);
    console.log(req.body.feedback);
    res.send('OOPS!!');
  }
});

//   app.get('/carray',function(req,res){

//     //var email = req.body.email;
//     var email = "bashka@gmail.com";
//     var obj = {
//       email
//     }
//     console.log(obj);
//     const python = spawn('python', ['../MAJOR/display_recommended_courses_for_rating.py']);
//     python.stdout.on('data', function(data){

//       console.log("Hello");
//       // var str = data.toString();
//       // str = str.replace(/'/g, '"');
//       // var list = JSON.parse(str);
//       // console.log(list);

//       var result = JSON.parse(data.toString())
//       console.log(result['cid_array']);
//       console.log(result['cname_array']);
//       res.send(result['cid_array']);
//     });

//     python.stdout.on('end', function(){
//       console.log("Reached here");
//      });
//      //python.stdin.write(JSON.stringify(JSON.stringify(interests_list)))
//      python.stdin.write(JSON.stringify(obj))
//      python.stdin.end()
//      // res.send('OK');
//  });