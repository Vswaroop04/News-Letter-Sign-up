const express = require("express");

const bodyParser = require("body-parser");

const request = require('request');

const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req,res) {

    res.sendFile(__dirname + "/signup.html" );
  
  })

  
  app.post("/", function(req,res){

    var firstname = req.body.fname ;
    var lastname = req.body.lname ;
    var email = req.body.email ;

    // data we were sending to mailchimp

    const data = {
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : firstname,
                    LNAME : lastname

                }
            }
        ]
    };

    // converting data to json data

    const jsonData = JSON.stringify(data);

// https functions for sending data    

    const url = "https://us14.api.mailchimp.com/3.0/lists/ff9608fb6b" ;
    
    const options = {

        method : "POST",
        auth: "vswaroop04:9842690ad11670130a609b5c8cd23cf3-us14"
    }


// for getting response from mailchimp 

    const request = https.request(url,options,function(response){

if(response.statusCode === 200){
    res.sendFile(__dirname + "/success.html");
}else{
    res.sendFile(__dirname + "/failure.html");
}

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
// sending json data to mail chimp


request.write (jsonData);
request.end();


})

app.post("/failure", function(req,res){

res.redirect("/");

})


app.listen(process.env.PORT || 3000, function(){

    console.log ("Server Started");
});


//9842690ad11670130a609b5c8cd23cf3-us14
//ff9608fb6b